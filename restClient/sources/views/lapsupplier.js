import { JetView } from "webix-jet";
import jendelaSupplier from "views/jendela/jendelaSupplier";

export default class SupplierView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Supplier" },
                { view: "button", value: "Print", id: "printSupplier", width: 100 }
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

        // Print Data
        $$("printSupplier").attachEvent("onItemClick", function () {
            window.open("http://202.67.10.181/supplier/pdf");
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
