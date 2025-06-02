const modelPath = "model/";
let model, maxPredictions;

async function init() {
    try {
        const modelURL = modelPath + "model.json";
        const metadataURL = modelPath + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("✅ Model loaded");
    } catch (err) {
        console.error("❌ Error loading model:", err);
    }
}

document.getElementById("imageInput").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    const imgElement = document.getElementById("preview");
    const resultElement = document.getElementById("results");

    if (file) {
        imgElement.src = URL.createObjectURL(file);
        imgElement.onload = async () => {
            try {
                const prediction = await model.predict(imgElement);
                console.log("📊 Prediction result:", prediction);

                resultElement.innerHTML = "<h6>Prediction:</h6>";
                prediction.forEach(p => {
                    const line = document.createElement("p");
                    line.innerText = `${p.className}: ${(p.probability * 100).toFixed(2)}%`;
                    resultElement.appendChild(line);
                });
            } catch (err) {
                console.error("❌ Prediction error:", err);
                resultElement.innerText = "Prediction failed.";
            }
        };
    }
});

init();
