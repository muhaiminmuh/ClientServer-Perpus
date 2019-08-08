import { JetView } from "webix-jet";
import jendelaBuku from "views/jendela/jendelaBuku";

export default class BukuView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Buku" },
                { view: "button", value:"Tambah" , id:"tambahBuku", width: 100 },
                { view: "button", value: "Ubah", id: "ubahBuku", width: 100 },
                { view: "button", value: "hapus", id: "hapusBuku", width: 100 },
                { view: "button", value: "Refresh", id: "refreshBuku", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id:"tabelBuku",
            select:true,
            columns: [
                { id: "id", header: "ID", width:200 },
                { id: "nama_buku", header: "Nama Buku", width:200 },
                { id: "jenis_buku", header: "Jenis" },
                { id: "pengarang", header: "Pengarang", width: 200 },
                { id: "harga", header: "Harga" }
            ],
            pager: "paginasi",
            url:"http://202.67.10.181/buku",
        };

        var pager = {
            view: "pager",
            id: "paginasi",
            animate: true,
        }

        var ui = {
            rows: [
                header,
                halaman,
                pager
            ]
        };

        return ui;

    };


    ready() {
        var response = {
            success: function(response, data, xhr) {
                var hasil = data.json();
                if (hasil.status) {
                    webix.message(hasil.pesan);
                    $$("tabelBuku").clearAll();
                    $$("tabelBuku").load("http://202.67.10.181/buku");
                    $$('jendelaBuku').hide();
                } else {
                    webix.alert({
                        title:"informasi",
                        ok:"Ok",
                        text:hasil.pesan
                    });
                }
            },
            error:function(text, data, xhr) {
                webix.alert({
                    title: "informasi",
                    ok: "Ok",
                    text: "Gagal di sisi web service"
                });
            }
        
        };


        // Tambah Data
        $$("tambahBuku").attachEvent("onItemClick", function () {
            $$("formBuku").clear();
            $$("jendelaBuku").show();
        });


        // Ubah Data
        $$("ubahBuku").attachEvent("onItemClick", function() {
            var id = $$("tabelBuku").getSelectedId();
            if (id=null) {
                webix.alert({
                    title:"Informasi",
                    ok:"Ok",
                    text:"Data belum dipilih"
                });
                return;
            }
            var data = $$("tabelBuku").getSelectedItem();
            $$("formBuku").setValues(data);
            $$("jendelaBuku").show();
        });


        // Simpan Data
        $$("simpanBuku").attachEvent("onItemClick", function () {
            var validasi = $$("formBuku").validate();

            if ( !validasi ) {
                webix.alert({
                    title:"Informasi",
                    ok:"Ok",
                    text:"Form belum lengkap"
                });
                return;
            };

            var data = $$("formBuku").getValues();
            if (data._id == null) {
                webix.ajax().put("http://202.67.10.181/buku", data, response);
            } else {
                webix.ajax().post("http://202.67.10.181/buku", data, response);
            }
        
        });


        // Hapus Data
        $$("hapusBuku").attachEvent("OnItemClick", function () {
            var id = $$("tabelBuku").getSelectedId();
            if (id==null) {
                webix.alert({
                    title: "Informasi",
                    ok:"Ok",
                    text: "Data belum dipilih"
                });
                return;
            }

            webix.confirm({
                title:"Konfirmasi",
                ok:"Ya",
                cancel:"Tidak",
                text:"Yakin akan menghapus data yang dipilih ?",
                callback:function(jwb) {
                    if (jwb) {
                        var data = $$("tabelBuku").getSelectedItem();
                        webix.ajax().del("http://202.67.10.181/buku", data, response);
                    }
                }
            });

        });


        // Refesh Data
        $$("refreshBuku").attachEvent("OnItemClick", function(){
            $$("tabelBuku").clearAll();
            $$("tabelBuku").load("http://202.67.10.181/buku");
        });


        // Tutup Jendela
        $$("tutupJendelaBuku").attachEvent("OnItemClick", function () {
            $$("jendelaBuku").hide();
        });


    }

    init() {
        this.jendelaBuku = this.ui(jendelaBuku);
    }

};
