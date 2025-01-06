import firebase from '../config/firebase.js';

const { firestore } = firebase;

export async function getTrainers(req, res) {
    try {
        const trainersSnapshot = await firestore.collection('trainers').get();
        const trainers = trainersSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(trainers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createTrainer(req, res) {
    const { name, specialty, experience, contactInfo } = req.body;

    try {
        const newTrainer = await firestore.collection('trainers').add({
            name,
            specialty,
            experience,
            contactInfo,
        });
        return res.status(201).json({ id: newTrainer.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function assignSchedule(req, res) {
    const { trainerId, classes } = req.body;  // List of class IDs
    try {
        await firestore.collection('trainers').doc(trainerId).update({ classes });
        res.status(200).json({ message: 'Schedule assigned' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export async function getTrainerSchedule(req, res) {
    const { trainerId } = req.params;
    try {
        const trainer = await firestore.collection('trainers').doc(trainerId).get();
        if (!trainer.exists) return res.status(404).json({ message: 'Trainer not found' });

        const schedule = trainer.data().classes || [];
        res.status(200).json({ schedule });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
