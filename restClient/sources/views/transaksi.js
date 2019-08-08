import { JetView } from "webix-jet";
import jendelaTransaksi from "views/jendela/jendelaTransaksi";

export default class TransaksiView extends JetView {
    config() {

        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Transaksi" },
                { view: "button", value: "Tambah", id: "tambahTransaksi", width: 100 },
                { view: "button", value: "Ubah", id: "ubahTransaksi", width: 100 },
                { view: "button", value: "hapus", id: "hapusTransaksi", width: 100 },
                { view: "button", value: "Refresh", id: "refreshTransaksi", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelTransaksi",
            select: true,
            columns: [
                { id: "nama_pelanggan", header: "Nama Pelanggan", width: 200 },
                { id: "id_buku", header: "ID Buku", width: 200 },
                { id: "jumlah", header: "Jumlah", width: 200 },
                { id: "total_harga", header: "Total Harga", width: 200 }
            ],
            pager: "paginasi",
            url: "http://202.67.10.181/transaksi",
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
                    $$("tabelTransaksi").clearAll();
                    $$("tabelTransaksi").load("http://202.67.10.181/transaksi");
                    $$('jendelaTransaksi').hide();
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
        $$("tambahTransaksi").attachEvent("onItemClick", function () {
            $$("formTransaksi").clear();
            $$("jendelaTransaksi").show();
        });


        // Ubah Data
        $$("ubahTransaksi").attachEvent("onItemClick", function () {
            var id = $$("tabelTransaksi").getSelectedId();
            if (id = null) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Data belum dipilih"
                });
                return;
            }
            var data = $$("tabelTransaksi").getSelectedItem();
            $$("formTransaksi").setValues(data);
            $$("jendelaTransaksi").show();
        });


        // Simpan Data
        $$("simpanTransaksi").attachEvent("onItemClick", function () {
            var validasi = $$("formTransaksi").validate();

            if (!validasi) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Form belum lengkap"
                });
                return;
            };

            var data = $$("formTransaksi").getValues();
            if (data._id == null) {
                webix.ajax().put("http://202.67.10.181/transaksi", data, response);
            } else {
                webix.ajax().post("http://202.67.10.181/transaksi", data, response);
            }

        });


        // Hapus Data
        $$("hapusTransaksi").attachEvent("OnItemClick", function () {
            var id = $$("tabelTransaksi").getSelectedId();
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
                        var data = $$("tabelTransaksi").getSelectedItem();
                        webix.ajax().del("http://202.67.10.181/transaksi", data, response);
                    }
                }
            });

        });


        // Refesh Data
        $$("refreshTransaksi").attachEvent("OnItemClick", function () {
            $$("tabelTransaksi").clearAll();
            $$("tabelTransaksi").load("http://202.67.10.181/transaksi");
        });


        // Tutup Jendela
        $$("tutupJendelaTransaksi").attachEvent("OnItemClick", function () {
            $$("jendelaTransaksi").hide();
        });


    }

    init() {
        this.jendelaTransaksi = this.ui(jendelaTransaksi);
    }

};
