import { JetView } from "webix-jet";
import jendelaPembelian from "views/jendela/jendelaPembelian";

export default class PembelianView extends JetView {
    config() {

        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Pembelian" },
                { view: "button", value: "Print", id: "printPembelian", width: 100 },
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
    
        // Print Data
        $$("printPembelian").attachEvent("onItemClick", function () {
            window.open("http://202.67.10.181/pembelian/pdf");
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
