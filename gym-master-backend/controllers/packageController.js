import firebase from '../config/firebaseConfig.js';

const { firestore } = firebase;

// Create a new package
export async function createPackage(req, res) {
    const { name, price, duration, description } = req.body;
    try {
        const newPackage = await firestore.collection('packages').add({
            name,
            price,
            duration,
            description,
        });
        res.status(201).json({ id: newPackage.id, ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Fetch all packages with pagination
export async function getPackages(req, res) {
    const limit = parseInt(req.query.limit) || 1;  // Get the limit from query params
    const page = parseInt(req.query.page) || 1;    // Get the page number from query params
    const offset = (page - 1) * limit;             // Calculate the offset

    try {
        // Fetch the total number of packages to handle pagination in frontend
        const totalSnapshot = await firestore.collection('packages').get();
        const totalPackages = totalSnapshot.size;

        const packagesSnapshot = await firestore.collection('packages')
            .orderBy('price', 'desc')
            .offset(offset)
            .limit(limit)
            .get();

        const packages = await Promise.all(
            packagesSnapshot.docs.map(async (doc) => {
                const packageData = doc.data();

                // Count members subscribed to this package
                const memberCountSnapshot = await firestore.collection('clients')
                    .where('package', '==', doc.id)
                    .get();
                const memberCount = memberCountSnapshot.size;

                return {
                    id: doc.id,
                    ...packageData,
                    memberCount,  // Add member count to each package
                };
            })
        );
        res.status(200).json({ packages, totalPackages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getPackageById(req, res) {
    const { id } = req.params;
    try {
        const packageDoc = await firestore.collection('packages').doc(id).get();
        if (!packageDoc.exists) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.status(200).json({ id: packageDoc.id, ...packageDoc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a package by ID
export async function updatePackage(req, res) {
    const { id } = req.params;
    const { name, price, duration, description } = req.body;
    try {
        await firestore.collection('packages').doc(id).update({ name, price, duration, description });
        res.status(200).json({ message: 'Package updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a package by ID
export async function deletePackage(req, res) {
    const { id } = req.params;
    try {
        await firestore.collection('packages').doc(id).delete();
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
