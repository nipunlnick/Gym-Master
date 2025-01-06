import firebase from '../config/firebase.js';

const { firestore } = firebase;

export async function getClasses(req, res) {
    try {
        const classesSnapshot = await firestore.collection('classes').get();
        const classes = classesSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(classes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createClass(req, res) {
    const { name, schedule } = req.body;

    try {
        const newClass = await firestore.collection('classes').add({
            name,
            schedule,
        });
        return res.status(201).json({ id: newClass.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
