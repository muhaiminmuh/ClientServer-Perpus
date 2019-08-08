var formPengarang = {
    view: "form", id: "formPengarang", width: 500, elements: [
        { view: "text", label: "ID", name: "id", labelWidth: 150, required: true },
        { view: "text", label: "Nama Pengarang", name: "nama_pengarang", labelWidth: 150, required: true },
        { view: "text", label: "Alamat Pengarang", name: "alamat", labelWidth: 150, required: true },
        { view: "button", value: "Simpan", id: "simpanPengarang" }
    ]
}

var jendelaPengarang = {
    view: "window", id: "jendelaPengarang", position: "center",
    modal: true,
    head: {
        view: "toolbar", cols: [
            { view: "label", label: "Form Pengarang" },
            { view: "button", value: "X", id: "tutupJendelaPengarang", width: 40 }
        ]
    },
    body: formPengarang
};

export default jendelaPengarang;