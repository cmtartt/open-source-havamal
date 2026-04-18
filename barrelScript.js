const fs = require('fs');

const icelandic = JSON.parse(fs.readFileSync('./json/icelandic.json', 'utf8'));
const bellows = JSON.parse(fs.readFileSync('./json/bellows.json', 'utf8'));
const bray = JSON.parse(fs.readFileSync('./json/bray.json', 'utf8'));
const petit = JSON.parse(fs.readFileSync('./json/petit.json', 'utf8'));

const finalHavamal = icelandic.data.map((verse, index) => {
    const vNum = index + 1;
    let bRef = index; // Bellows/Bray index
    let pRef = index; // Petit index
    let note = null;

    // --- FIX 1: The 'Cattle' vs 'Fitjung' Swap (76-78) ---
    if (vNum === 76) bRef = 76; // Match Ice Cattle 1 with Bellows Cattle 1
    if (vNum === 77) bRef = 77; // Match Ice Cattle 2 with Bellows Cattle 2
    if (vNum === 78) { 
        bRef = 75; // Match Ice Fitjung with Bellows Fitjung
        note = "Scholarly Note: Bellows/Bray move this stanza earlier in their editions.";
    }

    // --- FIX 2: The Rúnatal / Tree Shift (138-162) ---
    if (vNum >= 138 && vNum <= 162) {
        bRef = index + 1; // Skip the Bellows summary at index 137
        if (vNum === 138) note = "Note: Bellows inserts a summary here; his Rúnatal begins at V139.";
    }

    // --- FIX 3: The 18th Song Alignment (163) ---
    if (vNum === 163) {
        bRef = 164; // Bellows 18th Song is at the very end
        pRef = 162; // Petit 18th Song is correct at index 162
    }

    // --- FIX 4: The Final Conclusion (164) ---
    if (vNum === 164) {
        bRef = 137; // Bellows put the conclusion earlier!
        pRef = 163; // Petit conclusion matches index 163
        note = "Conclusion: This summary stanza is placed at the end of the original manuscript.";
    }

    return {
        verse: vNum,
        original: verse.text.trim(),
        academic_note: note,
        translations: {
            bellows: bellows.data[bRef]?.text.trim() || "OMITTED",
            bray: bray.data[bRef]?.text.trim() || "OMITTED",
            petit: petit.data[pRef]?.text.trim() || "OMITTED"
        }
    };
});

fs.writeFileSync('./havamal_api_v1_gold.json', JSON.stringify(finalHavamal, null, 2));
console.log("Hearth-Fire Lit: Gold Standard API Created.");