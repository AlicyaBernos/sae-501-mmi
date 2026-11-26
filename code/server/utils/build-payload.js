import fs from "node:fs";

export const buildPayload = (body = {}, file = null) => {
    if (!file) {
        return JSON.stringify(body);
    }

    const form = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        form.append(key, value);
    });

    const imageBlob = new Blob([fs.readFileSync(file.path)], { type: file.mimetype });
    form.append(file.fieldname, imageBlob, file.originalname); // problème ma version de node ne veut pas de lire le fichier petit à petit donc je le fais lire d'un coup

    return form;
};
