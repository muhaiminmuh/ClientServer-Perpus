var formSupplier = {
    view: "form", id: "formSupplier", width: 500, elements: [
        { view: "text", label: "ID", name: "id", labelWidth: 150, required: true },
        { view: "text", label: "Nama Supplier", name: "nama_supplier", labelWidth: 150, required: true },
        { view: "text", label: "Alamat Supplier", name: "alamat", labelWidth: 150, required: true },
        { view: "button", value: "Simpan", id: "simpanSupplier" }
    ]
}

var jendelaSupplier = {
    view: "window", id: "jendelaSupplier", position: "center",
    modal: true,
    head: {
        view: "toolbar", cols: [
            { view: "label", label: "Form Supplier" },
            { view: "button", value: "X", id: "tutupJendelaSupplier", width: 40 }
        ]
    },
    body: formSupplier
};

export default jendelaSupplier;