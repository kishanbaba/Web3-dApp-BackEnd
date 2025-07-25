import { ethers } from 'ethers';

/**
 * Verifies an Ethereum message signature.
 * @param {string} message - The original message that was signed.
 * @param {string} signature - The signature hash.
 * @returns {Promise<{isValid: boolean, signer: string}>} - An object with validity and the signer's address.
 * @throws {Error} if the signature is invalid.
 */
export async function verify(message, signature) {
    try {
        const signerAddress = ethers.verifyMessage(message, signature);
        return { isValid: !!signerAddress, signer: signerAddress };
    } catch (error) {
        console.error('Signature verification failed:', error.message);
        throw new Error('Invalid signature format or data.');
    }
}