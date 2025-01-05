import { firestore } from '../firebaseConfig';

export async function getMembers(req, res) {
    try {
        const membersSnapshot = await firestore.collection('members').get();
        const members = membersSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(members);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createMember(req, res) {
    const { name, membershipPlan, joinedDate, contactInfo } = req.body;

    try {
        const newMember = await firestore.collection('members').add({
            name,
            membershipPlan,
            joinedDate,
            contactInfo,
        });
        return res.status(201).json({ id: newMember.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
