import firebase from '../config/firebaseConfig.js';

const { firestore } = firebase;

export async function getClasses(req, res) {
    try {
        const classesSnapshot = await firestore.collection('classes').get();
        const classes = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createClass(req, res) {
    const { name, day, startTime, endTime, trainer } = req.body;

    try {
        const newClass = await firestore.collection('classes').add({
            name,
            day,
            startTime,
            endTime,
            trainer,
        });
        res.status(201).json({ id: newClass.id, ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getClassById(req, res) {
    const { id } = req.params;
    try {
        const classDoc = await firestore.collection('classes').doc(id).get();
        if (!classDoc.exists) {
            return res.status(404).json({ error: 'Class not found' });
        }
        res.status(200).json({ id: classDoc.id, ...classDoc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a class by ID
export async function updateClass(req, res) {
    const { id } = req.params;
    const { name, day, startTime, endTime, trainer } = req.body;
    try {
        await firestore.collection('classes').doc(id).update({ name, day, startTime, endTime, trainer });
        res.status(200).json({ message: 'Class updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a class by ID
export async function deleteClass(req, res) {
    const { id } = req.params;
    try {
        await firestore.collection('classes').doc(id).delete();
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Search and filter classes based on parameters
export async function searchClasses(req, res) {
    const { name, day, trainer } = req.query;

    try {
        let query = firestore.collection('classes');

        // Apply filters based on the query parameters
        if (name) {
            query = query.where('name', '>=', name).where('name', '<=', name + '\uf8ff');
        }
        if (day) {
            query = query.where('day', '==', day);
        }
        if (trainer) {
            query = query.where('trainer', '==', trainer);
        }

        const classesSnapshot = await query.get();
        const classes = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}