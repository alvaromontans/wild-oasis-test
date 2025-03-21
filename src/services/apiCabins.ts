import { CabinInterface } from "../interfaces/CabinInterface";
import supabase from "./supabase";
import { supabaseUrl } from './supabase';

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error('Error fetching cabins')
    }

    return data;
}

export async function createEditCabin(newCabin: CabinInterface, id?: number) {
    const hasImagePath = String(newCabin.image).startsWith(supabaseUrl);

    const imageName = newCabin.image ? `${newCabin.image.name}`
        .replaceAll("/", "") : "";

    const imagePath = hasImagePath ? newCabin.image :
        `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;


    let query;

    if (!id) {
        query = supabase.from('cabins').insert([
            { ...newCabin, image: imagePath }
        ]);
    } else {
        query = supabase.from('cabins')
            .update({ ...newCabin, image: imagePath })
            .eq('id', id);
    }

    const { data, error } = await query.select();

    if (error) {
        console.error(error);
        throw new Error('Error añadiendo cabaña')
    }

    const { data: existingImage, error: checkError } = await supabase
        .storage
        .from('cabin-images')
        .list('', { search: imageName });

    if (checkError) {
        console.error(checkError);
        throw new Error('Error comprobando la imagen en el bucket');
    }

    if (existingImage.length === 0) {
        const { error: storageError } = await supabase.storage
            .from('cabin-images')
            .upload(imageName, newCabin.image);

        if (storageError) {
            await supabase
                .from('cabins')
                .delete()
                .eq('id', data[0].id)
            throw new Error('Error subiendo imagen')
        }
    }

    return data;
}

export async function deleteCabin(id: number) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if (error) {
        console.error(error);
        throw new Error('Error eliminando cabaña')
    }
}