// Function to handle file conversion
function convertTxtToVcf() {
    const fileInput = document.getElementById("txtFile");
    const file = fileInput.files[0];
    const fileNameDisplay = document.getElementById("fileName");

    if (file) {
        fileNameDisplay.textContent = file.name;
        const reader = new FileReader();

        reader.onload = function(event) {
            const text = event.target.result;
            document.getElementById("vcfOutput").value = text;
        };

        reader.readAsText(file);
    }
}

// Function to download VCF file
function downloadVCF() {
    const adminName = document.getElementById("adminName").value || "admin";
    const navyName = document.getElementById("navyName").value || "navy";
    const anggotaName = document.getElementById("anggotaName").value || "anggota";
    const fileName = document.getElementById("vcfFileName").value || "contacts";
    const content = document.getElementById("vcfOutput").value;

    const vcfData = content.split("\n").map((line, index) => {
        if (line.startsWith("admin")) {
            return `BEGIN:VCARD\nFN:${adminName} ${index + 1}\nTEL:${line}\nEND:VCARD`;
        } else if (line.startsWith("navy")) {
            return `BEGIN:VCARD\nFN:${navyName} ${index + 1}\nTEL:${line}\nEND:VCARD`;
        } else if (line.startsWith("anggota")) {
            return `BEGIN:VCARD\nFN:${anggotaName} ${index + 1}\nTEL:${line}\nEND:VCARD`;
        } else {
            return `BEGIN:VCARD\nFN:${fileName} ${index + 1}\nTEL:${line}\nEND:VCARD`;
        }
    }).join("\n");

    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}