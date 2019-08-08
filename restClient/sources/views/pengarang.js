import { JetView } from "webix-jet";
import jendelaPengarang from "views/jendela/jendelaPengarang";

export default class PengarangView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Pengarang" },
                { view: "button", value: "Tambah", id: "tambahPengarang", width: 100 },
                { view: "button", value: "Ubah", id: "ubahPengarang", width: 100 },
                { view: "button", value: "hapus", id: "hapusPengarang", width: 100 },
                { view: "button", value: "Refresh", id: "refreshPengarang", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelPengarang",
            select: true,
            columns: [
                { id: "id", header: "ID" },
                { id: "nama_pengarang", header: "Nama Pengarang", width: 200 },
                { id: "alamat", header: "Alamat Pengarang", width: 200 }
            ],
            pager: "paginasi",
            url: "http://202.67.10.181/pengarang",
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
                    $$("tabelPengarang").clearAll();
                    $$("tabelPengarang").load("http://202.67.10.181/pengarang");
                    $$('jendelaPengarang').hide();
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
        $$("tambahPengarang").attachEvent("onItemClick", function () {
            $$("formPengarang").clear();
            $$("jendelaPengarang").show();
        });


        // Ubah Data
        $$("ubahPengarang").attachEvent("onItemClick", function () {
            var id = $$("tabelPengarang").getSelectedId();
            if (id = null) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Data belum dipilih"
                });
                return;
            }
            var data = $$("tabelPengarang").getSelectedItem();
            $$("formPengarang").setValues(data);
            $$("jendelaPengarang").show();
        });


        // Simpan Data
        $$("simpanPengarang").attachEvent("onItemClick", function () {
            var validasi = $$("formPengarang").validate();

            if (!validasi) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Form belum lengkap"
                });
                return;
            };

            var data = $$("formPengarang").getValues();
            if (data._id == null) {
                webix.ajax().put("http://202.67.10.181/pengarang", data, response);
            } else {
                webix.ajax().post("http://202.67.10.181/pengarang", data, response);
            }

        });


        // Hapus Data
        $$("hapusPengarang").attachEvent("OnItemClick", function () {
            var id = $$("tabelPengarang").getSelectedId();
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
                        var data = $$("tabelPengarang").getSelectedItem();
                        webix.ajax().del("http://202.67.10.181/pengarang", data, response);
                    }
                }
            });

        });


        // Refesh Data
        $$("refreshPengarang").attachEvent("OnItemClick", function () {
            $$("tabelPengarang").clearAll();
            $$("tabelPengarang").load("http://202.67.10.181/pengarang");
        });


        // Tutup Jendela
        $$("tutupJendelaPengarang").attachEvent("OnItemClick", function () {
            $$("jendelaPengarang").hide();
        });


    }

    init() {
        this.jendelaPengarang = this.ui(jendelaPengarang);
    }

};
