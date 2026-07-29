document.addEventListener("DOMContentLoaded", () => {
    const RATINGS = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    const CLASSES = ["red", "curious", "ylike", "moderate", "ohyes"];

    const BABY_TYPES = {
        twentyFourSevenBaby: { name: "24/7 Baby", description: "You naturally thrive living as a baby full-time, enjoying nurturing care with diapers and extensive babying like bottles and pacifiers." },
        twentyFourSevenDD: { name: "24/7 DD", description: "You enjoy a Daddy forcing you to live as a baby 24/7, with strict rules like mandatory diaper use, no toilet access, and enforced incontinence." },
        strictDD: { name: "Strict DD", description: "You like a Daddy forcing you to wear and use diapers, with strict discipline and punishments." },
        regularBaby: { name: "Regular Baby", description: "You naturally enjoy regressing to a baby role occasionally, with gentle diaper use and light babying from a Daddy." },
        regularDD: { name: "Regular DD", description: "You enjoy a Daddy encouraging occasional diaper use with moderate structure and minimal babying." },
        weekendBaby: { name: "Weekend Baby", description: "You naturally regress to a baby role on weekends, with light diaper use and basic babying from a Daddy." }
    };

    const QUESTIONS = [
        { text: "I enjoy wearing diapers 24/7 with no exceptions, replacing all underwear, as enforced by a Daddy", aria: "Rate 24/7 diaper wearing", weights: { twentyFourSevenDD: 1.0 } },
        { text: "I enjoy wearing diapers for at least 50% of each week, including 3 consecutive days, as set by a Daddy", aria: "Rate regular diaper wearing", weights: { twentyFourSevenBaby: 0.5, regularBaby: 1.0, regularDD: 1.0 } },
        { text: "I enjoy wearing diapers only on weekends (Friday after work to Monday morning) with a Daddy’s support", aria: "Rate weekend diaper wearing", weights: { weekendBaby: 1.0 } },
        { text: "I am comfortable wearing pull-ups for work or social events, with diapers at home or with a Daddy", aria: "Rate pull-ups usage", weights: { twentyFourSevenDD: 1.0, regularDD: 0.5 } },
        { text: "I am comfortable using diapers for both wetting and messing at home and in public, with no toilet access when with a Daddy", aria: "Rate strict diaper usage", weights: { twentyFourSevenDD: 1.0, strictDD: 1.0 } },
        { text: "I enjoy using diapers for peeing, with one toilet entry per day for messing, as set by a Daddy", aria: "Rate moderate diaper usage", weights: { regularBaby: 1.0, regularDD: 1.0 } },
        { text: "I enjoy using diapers for peeing only, with full toilet access for messing, during baby play", aria: "Rate light diaper usage", weights: { regularBaby: 1.0, weekendBaby: 1.0 } },
        { text: "I enjoy a Daddy banning all toilet use when in diapers, using them for all needs", aria: "Rate potty ban", weights: { twentyFourSevenDD: 1.0 } },
        { text: "I enjoy a Daddy enforcing incontinence with diuretics (e.g., cranberry juice) and laxatives multiple times a week", aria: "Rate enforced incontinence", weights: { twentyFourSevenDD: 1.0 } },
        { text: "I am comfortable with a Daddy using fibre supplements daily to increase diaper use", aria: "Rate fibre loading", weights: { twentyFourSevenDD: 1.0, strictDD: 1.0 } },
        { text: "I enjoy a Daddy using weekly suppositories or enemas to ensure diaper use", aria: "Rate weekly suppositories", weights: { twentyFourSevenDD: 1.0, strictDD: 1.0 } },
        { text: "I am comfortable drinking 3 liters of water daily to increase diaper wetting, as set by a Daddy", aria: "Rate water intake", weights: { strictDD: 1.0, regularDD: 1.0 } },
        { text: "I enjoy a Daddy requiring permission for all diaper changes, with no self-changes when together", aria: "Rate strict diaper checks", weights: { twentyFourSevenDD: 1.0, strictDD: 1.0 } },
        { text: "I enjoy a Daddy requiring me to ask for diaper checks or changes when together", aria: "Rate moderate diaper checks", weights: { strictDD: 1.0, regularDD: 1.0 } },
        { text: "I prefer managing my own diaper changes with occasional checks by a Daddy", aria: "Rate light diaper checks", weights: { twentyFourSevenBaby: 1.0, regularBaby: 1.0, weekendBaby: 1.0 } },
        { text: "I enjoy a Daddy enforcing strict punishments (e.g., spankings for any minor infraction) alongside two weekly maintenance punishments", aria: "Rate strict punishments", weights: { twentyFourSevenDD: 1.0, strictDD: 1.0 } },
        { text: "I am comfortable with a Daddy giving two weekly maintenance punishments to assert control", aria: "Rate moderate punishments", weights: { strictDD: 1.0, regularDD: 1.0 } },
        { text: "I enjoy daily babying, including bottles, pacifiers, bibs, baby talk, and crawling, enforced by a Daddy", aria: "Rate extensive babying", weights: { twentyFourSevenBaby: 1.0, twentyFourSevenDD: 1.0 } },
        { text: "I enjoy using pacifiers and baby-themed clothes (e.g., onesies) at home with a Daddy’s encouragement", aria: "Rate moderate babying", weights: { twentyFourSevenBaby: 0.5, regularBaby: 1.0, regularDD: 1.0 } },
        { text: "I enjoy occasional babying, like drinking from a bottle at bedtime, with a Daddy’s support", aria: "Rate light babying", weights: { twentyFourSevenBaby: 1.0, regularBaby: 1.0, weekendBaby: 1.0 } }
    ];

    const form = document.getElementById("baby-quiz");
    const container = document.getElementById("questions-container");

    // Dynamic markup generation with side-by-side flex control row
    container.innerHTML = QUESTIONS.map((q, idx) => `
        <div class="activity-card">
            <label for="q-${idx}" class="question-title">${q.text}</label>
            <div class="control-row">
                <input 
                    type="range" 
                    id="q-${idx}" 
                    name="q-${idx}" 
                    data-index="${idx}"
                    value="0" min="0" max="4" 
                    class="${CLASSES[0]}" 
                    aria-label="${q.aria}"
                />
                <output id="o-${idx}" for="q-${idx}" class="output-badge ${CLASSES[0]}">${RATINGS[0]}</output>
            </div>
        </div>
    `).join("");

    // Event delegation on reactive slider input
    form.addEventListener("input", (e) => {
        if (e.target.matches("input[type='range']")) {
            const idx = e.target.dataset.index;
            const val = parseInt(e.target.value, 10);
            const output = document.getElementById(`o-${idx}`);

            output.textContent = RATINGS[val];
            output.className = `output-badge ${CLASSES[val]}`;
            e.target.className = CLASSES[val];
        }
    });

    // Score evaluation engine
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = Array.from(form.querySelectorAll("input[type='range']"));
        const responses = inputs.map(i => parseInt(i.value, 10));

        const scores = Object.keys(BABY_TYPES).reduce((acc, k) => ({ ...acc, [k]: 0 }), {});
        const maxPossible = Object.keys(BABY_TYPES).reduce((acc, k) => ({ ...acc, [k]: 0 }), {});

        QUESTIONS.forEach((q, idx) => {
            const val = responses[idx];
            Object.entries(q.weights).forEach(([type, factor]) => {
                scores[type] += val * factor;
                maxPossible[type] += 4 * factor;
            });
        });

        const normalized = {};
        Object.keys(scores).forEach(type => {
            normalized[type] = maxPossible[type] > 0 ? scores[type] / maxPossible[type] : 0;
        });

        const maxScore = Math.max(...Object.values(normalized));
        const resultType = maxScore === 0 ? "regularBaby" : Object.keys(normalized).find(type => normalized[type] === maxScore);
        const result = BABY_TYPES[resultType];

        document.getElementById("baby-type").textContent = `${result.name}: ${result.description}`;
        document.getElementById("result").style.display = "block";
        form.style.display = "none";
        document.getElementById("quiz-explanation").style.display = "none";

        const answersContainer = document.getElementById("answers-text");
        answersContainer.innerHTML = QUESTIONS.map((q, idx) => {
            const val = responses[idx];
            return `<p class="answer-item ${CLASSES[val]}">- ${q.text}: <strong>${RATINGS[val]}</strong></p>`;
        }).join("");

        const hash = responses.join("");
        const url = `${window.location.origin}${window.location.pathname}#${hash}`;
        document.getElementById("shareable-link").value = url;
    });

    // Actions
    document.getElementById("btn-copy").addEventListener("click", () => {
        const linkInput = document.getElementById("shareable-link");
        navigator.clipboard.writeText(linkInput.value);
        alert("Link copied to clipboard!");
    });

    document.getElementById("btn-download").addEventListener("click", () => {
        const inputs = Array.from(form.querySelectorAll("input[type='range']"));
        const text = "My Age Play Baby Quiz Answers:\n" + QUESTIONS.map((q, idx) => `- ${q.text}: ${RATINGS[inputs[idx].value]}`).join("\n");
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "baby_quiz_answers.txt";
        link.click();
    });

    document.getElementById("btn-qr").addEventListener("click", () => {
        const url = document.getElementById("shareable-link").value;
        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = "";
        if (typeof QRCode !== "undefined") {
            new QRCode(qrContainer, { text: url, width: 128, height: 128 });
        }
    });

    // Hash state loader
    const hash = window.location.hash.slice(1);
    if (hash && hash.length === QUESTIONS.length && new RegExp(`^[0-4]{${QUESTIONS.length}}$`).test(hash)) {
        hash.split("").forEach((val, idx) => {
            const input = document.getElementById(`q-${idx}`);
            if (input) {
                input.value = val;
                input.dispatchEvent(new Event("input", { bubbles: true }));
            }
        });
    }
});
