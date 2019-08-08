import { JetView } from "webix-jet";
import jendelaPembelian from "views/jendela/jendelaPembelian";

export default class PembelianView extends JetView {
    config() {

        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Pembelian" },
                { view: "button", value: "Tambah", id: "tambahPembelian", width: 100 },
                { view: "button", value: "Ubah", id: "ubahPembelian", width: 100 },
                { view: "button", value: "hapus", id: "hapusPembelian", width: 100 },
                { view: "button", value: "Refresh", id: "refreshPembelian", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelPembelian",
            select: true,
            columns: [
                { id: "id_buku", header: "ID Buku", width: 200 },
                { id: "id_supplier", header: "ID Supplier", width: 200 },
                { id: "jumlah", header: "Jumlah", width: 200 },
                { id: "total_harga", header: "Total Harga", width: 200 }
            ],
            pager: "paginasi",
            url: "http://202.67.10.181/pembelian",
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
                    $$("tabelPembelian").clearAll();
                    $$("tabelPembelian").load("http://202.67.10.181/pembelian");
                    $$('jendelaPembelian').hide();
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
        $$("tambahPembelian").attachEvent("onItemClick", function () {
            $$("formPembelian").clear();
            $$("jendelaPembelian").show();
        });


        // Ubah Data
        $$("ubahPembelian").attachEvent("onItemClick", function () {
            var id = $$("tabelPembelian").getSelectedId();
            if (id = null) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Data belum dipilih"
                });
                return;
            }
            var data = $$("tabelPembelian").getSelectedItem();
            $$("formPembelian").setValues(data);
            $$("jendelaPembelian").show();
        });


        // Simpan Data
        $$("simpanPembelian").attachEvent("onItemClick", function () {
            var validasi = $$("formPembelian").validate();

            if (!validasi) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Form belum lengkap"
                });
                return;
            };

            var data = $$("formPembelian").getValues();
            if (data._id == null) {
                webix.ajax().put("http://202.67.10.181/pembelian", data, response);
            } else {
                webix.ajax().post("http://202.67.10.181/pembelian", data, response);
            }

        });


        // Hapus Data
        $$("hapusPembelian").attachEvent("OnItemClick", function () {
            var id = $$("tabelPembelian").getSelectedId();
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
                        var data = $$("tabelPembelian").getSelectedItem();
                        webix.ajax().del("http://202.67.10.181/pembelian", data, response);
                    }
                }
            });

        });


        // Refesh Data
        $$("refreshPembelian").attachEvent("OnItemClick", function () {
            $$("tabelPembelian").clearAll();
            $$("tabelPembelian").load("http://202.67.10.181/pembelian");
        });


        // Tutup Jendela
        $$("tutupJendelaPembelian").attachEvent("OnItemClick", function () {
            $$("jendelaPembelian").hide();
        });


    }

    init() {
        this.jendelaPembelian = this.ui(jendelaPembelian);
    }

};
