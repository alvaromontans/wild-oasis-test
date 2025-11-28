import { LoginInterface } from "../interfaces/LoginInterface";
import { SignupInterface } from "../interfaces/SignupInterface";
import { getEmailError } from "../utils/helpers";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ full_name, email, password }: SignupInterface) {
    if (!full_name || !email || !password) {
        throw new Error("All fields are required");
    }

    const emailError = getEmailError(email);
    if (emailError) {
        throw new Error(emailError);
    }

    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                full_name,
                avatar: ""
            }
        }
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }: LoginInterface) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });


    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) throw new Error('Login error', { cause: sessionError });
    if (!session.session) return null;

    const { data, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error(userError.message);

    return data.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

interface UpdateUserInterface {
    password?: string;
    full_name?: string;
    avatar?: File;
}

export async function updateCurrentUser({ password, full_name, avatar }: UpdateUserInterface) {
    const updateData: { data?: { full_name?: string, avatar?: string }, password?: string } = {};
    if (password) updateData.password = password;
    if (full_name) updateData.data = { ...updateData.data, full_name };
    if (avatar) updateData.data = { ...updateData.data, avatar: "" };

    if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({ password });
        if (passwordError) throw new Error(passwordError.message);
    }

    if (full_name || avatar) {
        const { data, error } = await supabase.auth.updateUser({ data: updateData.data });
        console.log({ data, error });
        if (error) throw new Error(error.message);
        if (!avatar) return data;

        const fileName = avatar.name;

        const { data: existingFile, error: existingFileError } =
            await supabase.storage.from("avatars").list('', { search: fileName });

        if (existingFileError) throw new Error(existingFileError.message);
        if (existingFile.length === 0) {
            const { error: storageError } =
                await supabase.storage.from("avatars").upload(fileName, avatar);

            if (storageError) throw new Error(storageError.message);
        }

        const { data: updatedUser, error: error2 } =
            await supabase.auth.updateUser(
                {
                    data: {
                        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`
                    }
                });

        if (error2) throw new Error(error2.message);

        return updatedUser;
    }
}