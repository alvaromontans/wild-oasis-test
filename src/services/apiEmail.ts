import { Resend } from 'resend';
import { EmailTemplate } from '../features/bill/EmailTemplate';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendEmail() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['keyehef703@bankrau.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'John' }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}