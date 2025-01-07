import firebase from '../config/firebaseConfig.js';

const { firestore } = firebase;

export async function getTrainers(req, res) {
    try {
        const trainersSnapshot = await firestore.collection('trainers').get();
        const trainers = trainersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(trainers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createTrainer(req, res) {
    const { name, specialty, assignedClasses, contactInfo } = req.body;

    try {
        const newTrainer = await firestore.collection('trainers').add({
            name,
            specialty,
            assignedClasses,
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

export async function getTrainerById(req, res) {
    const { id } = req.params;
    try {
        const trainerRef = await firestore.collection('trainers').doc(id).get();
        if (!trainerRef.exists) {
            return res.status(404).json({ error: 'Trainer not found' });
        }
        res.status(200).json({ id: trainerRef.id, ...trainerRef.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update trainer information by ID
export async function updateTrainer(req, res) {
    const { id } = req.params;
    const { name, specialty, assignedClasses, contactInfo } = req.body;

    try {
        const trainerRef = firestore.collection('trainers').doc(id);
        await trainerRef.update({
            name,
            specialty,
            assignedClasses,
            contactInfo,
        });

        return res.status(200).json({ message: 'Trainer updated successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Delete a trainer by ID
export async function deleteTrainer(req, res) {
    const { id } = req.params;

    try {
        await firestore.collection('trainers').doc(id).delete();
        return res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Search and filter trainers based on parameters
export async function searchTrainers(req, res) {
    const { name, specialty } = req.query;

    try {
        let query = firestore.collection('trainers');

        // Apply filters based on the query parameters
        if (name) {
            query = query.where('name', '>=', name).where('name', '<=', name + '\uf8ff');
        }
        if (specialty) {
            query = query.where('specialty', '==', specialty);
        }

        const trainersSnapshot = await query.get();
        const trainers = trainersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(trainers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}