let currentXML = "";
let currentTitle = "";

window.openXML = async (url, title) => {

    try {

        currentTitle = title;

        const res = await fetch(url);

        if(!res.ok){
            throw new Error("XML取得失敗");
        }

        currentXML = await res.text();

        document.getElementById("xmlView").textContent =
            currentXML;

        document.getElementById("xmlModal").style.display =
            "block";

    } catch(e) {

        alert("XMLが見つかりません（404）");
        console.error(e);

    }

};

window.closeXML = () => {

    document.getElementById("xmlModal").style.display =
        "none";

};

document.getElementById("downloadBtn").onclick = () => {

    const blob = new Blob(
        [currentXML],
        { type:"text/xml" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = currentTitle + ".xml";

    a.click();

    URL.revokeObjectURL(url);
};
