var formTransaksi = {
    view: "form", id: "formTransaksi", width: 500, elements: [
        { view: "text", label: "Nama Pelanggan", name: "nama_pelanggan", labelWidth: 150, required: true },
        { view: "combo", label: "Buku", name: "id_buku", options: "http://202.67.10.181/buku/combo", required: true, labelWidth: 150 },
        { view: "text", label: "Jumlah", name: "jumlah", required: true, labelWidth: 150 },
        { view: "text", label: "Total Harga", name: "total_harga", required: true, labelWidth: 150 },
        { view: "button", value: "Simpan", id: "simpanTransaksi" }
    ]
}

var jendelaTransaksi = {
    view: "window", id: "jendelaTransaksi", position: "center",
    modal: true,
    head: {
        view: "toolbar", cols: [
            { view: "label", label: "Form Transaksi" },
            { view: "button", value: "X", id: "tutupJendelaTransaksi", width: 40 }
        ]
    },
    body: formTransaksi
};

export default jendelaTransaksi;