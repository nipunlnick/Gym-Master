import firebase from '../config/firebaseConfig.js';

const { firestore } = firebase;

export async function getClients(req, res) {
    try {
        const clientsSnapshot = await firestore.collection('clients').get();
        const clients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createClient(req, res) {
    const { name, membershipPlan, joinedDate, status } = req.body;

    try {
        const newClient = await firestore.collection('clients').add({
            name,
            membershipPlan,
            joinedDate,
            status: status || 'Active',
        });
        return res.status(201).json({ id: newClient.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function getClientById(req, res) {
    const { id } = req.params;
    try {
        const clientRef = await firestore.collection('clients').doc(id).get();
        if (!clientRef.exists) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ id: clientRef.id, ...clientRef.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update client information by ID
export async function updateClient(req, res) {
    const { id } = req.params;
    const { name, membershipPlan, joinedDate, status } = req.body;

    try {
        const clientRef = firestore.collection('clients').doc(id);
        await clientRef.update({
            name,
            membershipPlan,
            joinedDate,
            status,
        });

        return res.status(200).json({ message: 'Client updated successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Delete a client by ID
export async function deleteClient(req, res) {
    const { id } = req.params;

    try {
        await firestore.collection('clients').doc(id).delete();
        return res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Search and filter clients based on parameters
export async function searchClients(req, res) {
    const { name, membershipPlan, status } = req.query;

    try {
        let query = firestore.collection('clients');

        // Apply filters based on the query parameters
        if (name) {
            query = query.where('name', '>=', name).where('name', '<=', name + '\uf8ff');
        }
        if (membershipPlan) {
            query = query.where('membershipPlan', '==', membershipPlan);
        }
        if (status) {
            query = query.where('status', '==', status);
        }

        const clientsSnapshot = await query.get();
        const clients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}