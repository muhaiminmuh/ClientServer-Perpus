var formKategori = {
    view: "form", id: "formKategori", width: 500, elements: [
        { view: "text", label: "ID", name: "id", labelWidth: 150, required: true },
        { view: "text", label: "Nama Kategori", name: "kategori", labelWidth: 150, required: true },
        { view: "button", value: "Simpan", id: "simpanKategori" }
    ]
}

var jendelaKategori = {
    view: "window", id: "jendelaKategori", position: "center",
    modal: true,
    head: {
        view: "toolbar", cols: [
            { view: "label", label: "Form Kategori" },
            { view: "button", value: "X", id: "tutupJendelaKategori", width: 40 }
        ]
    },
    body: formKategori
};

export default jendelaKategori;