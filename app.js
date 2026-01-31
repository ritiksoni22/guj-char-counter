function isMatraOrModifier(ch) {
    return /[\u0ABE-\u0ACC\u0A81-\u0A83]/.test(ch);
}

function isGujaratiConsonant(ch) {
    return /[\u0A95-\u0AB9]/.test(ch);
}

function countCharacters() {

    let text = document.getElementById("inputText").value;
    text = text.replace(/[^\u0A80-\u0AFF]/g, "");
    let count = 0, debug = [];

    for (let i = 0; i < text.length; i++) {

        let ch = text[i];

        if (isMatraOrModifier(ch)) continue;

        if (isGujaratiConsonant(ch)) {

            let cluster = ch, consonants = [ch], j = i;

            // Build conjunct cluster
            while (text[j + 1] === "્" && isGujaratiConsonant(text[j + 2])) {
                consonants.push(text[j + 2]);
                cluster += text[j + 1] + text[j + 2];
                j += 2;
            }

            // ⭐ Exception: ક્ષ
            if (cluster === "ક્ષ") {
                debug.push("ક્ષ");
                count++;
                i = j;
                continue;
            }

            // ⭐ Exception: Half ર
            if (consonants.length === 2 && consonants[1] === "ર") {
                debug.push(cluster);
                count++;
                i = j;
                continue;
            }

            // Default rule → count each consonant separately
            consonants.forEach(c => {
                debug.push(c);
                count++;
            });

            i = j;
            continue;
        }

        // Independent vowels
        debug.push(ch);
        count++;
    }

    document.getElementById("result").innerText = count;
    document.getElementById("debug").innerText = debug.join(" | ");
}