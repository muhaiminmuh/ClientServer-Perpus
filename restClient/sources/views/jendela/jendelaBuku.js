var formBuku = { view:"form", id:"formBuku", width:500, elements: [
    { view: "text", label: "ID", name: "id", labelWidth: 150, required:true},
    { view: "text", label: "Nama", name: "nama_buku", labelWidth: 150, required:true},
    { view: "combo", label: "Jenis", name: "jenis_buku", labelWidth: 150, options: "http://202.67.10.181/kategori/combo", required: true },
    { view: "combo", label: "Pengarang", name: "pengarang", labelWidth: 150, options: "http://202.67.10.181/pengarang/combo", required: true },
    { view: "text", label: "Harga", name: "harga", labelWidth: 150, required:true},
    { view:"button", value:"Simpan", id:"simpanBuku"}
]}

var jendelaBuku = { view:"window", id:"jendelaBuku", position:"center",
        modal:true,
        head: { view:"toolbar", cols: [
            { view:"label", label:"Form Buku"},
            { view:"button", value:"X", id:"tutupJendelaBuku", width:40 }
        ]},
        body: formBuku
};

export default jendelaBuku;