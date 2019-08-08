import { JetView } from "webix-jet";
import jendelaSupplier from "views/jendela/jendelaSupplier";

export default class SupplierView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Supplier" },
                { view: "button", value: "Tambah", id: "tambahSupplier", width: 100 },
                { view: "button", value: "Ubah", id: "ubahSupplier", width: 100 },
                { view: "button", value: "hapus", id: "hapusSupplier", width: 100 },
                { view: "button", value: "Refresh", id: "refreshSupplier", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelSupplier",
            select: true,
            columns: [
                { id: "id", header: "ID" },
                { id: "nama_supplier", header: "Nama Supplier", width: 200 },
                { id: "alamat", header: "Alamat Supplier", width: 200 }
            ],
            pager: "paginasi",
            url: "http://202.67.10.181/supplier",
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
                    $$("tabelSupplier").clearAll();
                    $$("tabelSupplier").load("http://202.67.10.181/supplier");
                    $$('jendelaSupplier').hide();
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
        $$("tambahSupplier").attachEvent("onItemClick", function () {
            $$("formSupplier").clear();
            $$("jendelaSupplier").show();
        });


        // Ubah Data
        $$("ubahSupplier").attachEvent("onItemClick", function () {
            var id = $$("tabelSupplier").getSelectedId();
            if (id = null) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Data belum dipilih"
                });
                return;
            }
            var data = $$("tabelSupplier").getSelectedItem();
            $$("formSupplier").setValues(data);
            $$("jendelaSupplier").show();
        });


        // Simpan Data
        $$("simpanSupplier").attachEvent("onItemClick", function () {
            var validasi = $$("formSupplier").validate();

            if (!validasi) {
                webix.alert({
                    title: "Informasi",
                    ok: "Ok",
                    text: "Form belum lengkap"
                });
                return;
            };

            var data = $$("formSupplier").getValues();
            if (data._id == null) {
                webix.ajax().put("http://202.67.10.181/supplier", data, response);
            } else {
                webix.ajax().post("http://202.67.10.181/supplier", data, response);
            }

        });


        // Hapus Data
        $$("hapusSupplier").attachEvent("OnItemClick", function () {
            var id = $$("tabelSupplier").getSelectedId();
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
                        var data = $$("tabelSupplier").getSelectedItem();
                        webix.ajax().del("http://202.67.10.181/supplier", data, response);
                    }
                }
            });

        });


        // Refesh Data
        $$("refreshSupplier").attachEvent("OnItemClick", function () {
            $$("tabelSupplier").clearAll();
            $$("tabelSupplier").load("http://202.67.10.181/supplier");
        });


        // Tutup Jendela
        $$("tutupJendelaSupplier").attachEvent("OnItemClick", function () {
            $$("jendelaSupplier").hide();
        });


    }

    init() {
        this.jendelaSupplier = this.ui(jendelaSupplier);
    }

};
