var formPembelian = {
    view: "form", id: "formPembelian", width: 500, elements: [
        { view: "combo", label: "Buku", name: "id_buku", options: "http://202.67.10.181/buku/combo", required: true, labelWidth: 150 },
        { view: "combo", label: "Supplier", name: "id_supplier", options: "http://202.67.10.181/supplier/combo", required: true, labelWidth: 150 },
        { view: "text", label: "Jumlah", name: "jumlah", required: true, labelWidth: 150 },
        { view: "text", label: "Total Harga", name: "total_harga", required: true, labelWidth: 150 },
        { view: "button", value: "Simpan", id: "simpanPembelian" }
    ]
}

var jendelaPembelian = {
    view: "window", id: "jendelaPembelian", position: "center",
    modal: true,
    head: {
        view: "toolbar", cols: [
            { view: "label", label: "Form Pembelian" },
            { view: "button", value: "X", id: "tutupJendelaPembelian", width: 40 }
        ]
    },
    body: formPembelian
};

export default jendelaPembelian;