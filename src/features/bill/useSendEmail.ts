import toast from "react-hot-toast";
import { sendEmail as sendEmailApi } from "../../services/apiEmail";

export function useSendEmail() {
    const sendEmail = async () => {
        try {
            await sendEmailApi();
            toast.success("Factura enviada a tu correo electrónico");
        } catch {
            toast.error("Error al enviar el correo electrónico");
        }
    };

    return { sendEmail };
}