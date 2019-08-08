import { JetView } from "webix-jet";
import jendelaKategori from "views/jendela/jendelaKategori";

export default class KategoriView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Kategori" },
                { view: "button", value: "Tambah", id: "tambahKategori", width: 100 },
                { view: "button", value: "Ubah", id: "ubahKategori", width: 100 },
                { view: "button", value: "hapus", id: "hapusKategori", width: 100 },
                { view: "button", value: "Refresh", id: "refreshKategori", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelKategori",
            select: true,
            columns: [
                { id: "id", header: "ID"},
                { id: "kategori", header: "Nama Kategori", width: 200 }
            ],
            pager: "paginasi",
            url: "http://202.67.10.181/kategori",
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
            success: function (response, data, xhr) {
                var hasil = data.json();
                if (hasil.status) {
                    webix.message(hasil.pesan);
                    $$("tabelKategori").clearAll();
                    $$("tabelKategori").load("http://202.67.10.181/kategori");
                    $$('jendelaKategori').hide();
                } else {
                    webix.alert({
                        title: "informasi",
                        ok: "Ok",
                        text: hasil.pesan
                    });
                }
            },
            error: function (text, data, xhr) {
                webix.alert({
                    title: "informasi",
                    ok: "Ok",
                    text: "Gagal di sisi web service"
                });
            }

        };


        // Tambah Data
        $$("tambahKategori").attachEvent("onItemClick", function () {
            $$("formKategori").clear();
            $$("jendelaKategori").show();
        });


        // Ubah Data
        $$("ubahKategori").attachEvent("onItemClick", function () {
            var id = $$("tabelKategori").getSelectedId();
            if (id = null) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Data belum dipilih"
                });
                return;
            }
            var data = $$("tabelKategori").getSelectedItem();
            $$("formKategori").setValues(data);
            $$("jendelaKategori").show();
        });


        // Simpan Data
        $$("simpanKategori").attachEvent("onItemClick", function () {
            var validasi = $$("formKategori").validate();

            if (!validasi) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Form belum lengkap"
                });
                return;
            };

            var data = $$("formKategori").getValues();
            if (data._id == null) {
                webix.ajax().put("http://202.67.10.181/kategori", data, response);
            } else {
                webix.ajax().post("http://202.67.10.181/kategori", data, response);
            }

        });


        // Hapus Data
        $$("hapusKategori").attachEvent("OnItemClick", function () {
            var id = $$("tabelKategori").getSelectedId();
            if (id == null) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Data belum dipilih"
                });
                return;
            }

            webix.confirm({
                title: "Konfirmasi",
                ok: "Ya",
                cancel: "Tidak",
                text: "Yakin akan menghapus data yang dipilih ?",
                callback: function (jwb) {
                    if (jwb) {
                        var data = $$("tabelKategori").getSelectedItem();
                        webix.ajax().del("http://202.67.10.181/kategori", data, response);
                    }
                }
            });

        });


        // Refesh Data
        $$("refreshKategori").attachEvent("OnItemClick", function () {
            $$("tabelKategori").clearAll();
            $$("tabelKategori").load("http://202.67.10.181/kategori");
        });


        // Tutup Jendela
        $$("tutupJendelaKategori").attachEvent("OnItemClick", function () {
            $$("jendelaKategori").hide();
        });


    }

    init() {
        this.jendelaKategori = this.ui(jendelaKategori);
    }

};
