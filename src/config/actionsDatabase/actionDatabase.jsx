import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { DatabaseFirestore } from "../firebase/config";
import Swal from "sweetalert2";


export async function AddItem(name, type, idUser, value) {
    try {
        await addDoc(collection(DatabaseFirestore, "finanças"), {
            data: Timestamp.fromDate(new Date()),
            id_user: idUser,
            nome: name,
            tipo: type,
            valor: value
        });

    } catch (error) {
        console.log(error)
    }
}

export async function updateItem(idItem, name, type, idUser, value) {
    const docRef = doc(DatabaseFirestore, "finanças", idItem);

    await updateDoc(docRef, {
        data: Timestamp.fromDate(new Date()),
        id_user: idUser,
        nome: name,
        tipo: type,
        valor: value
    })
}

export async function deleteItem(idItem) {
    await deleteDoc(doc(DatabaseFirestore, "finanças", idItem));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Apagado com sucesso!',
        showConfirmButton: false,
        timer: 1200
    })
}