import { JetView } from "webix-jet";
import jendelaPengarang from "views/jendela/jendelaPengarang";

export default class PengarangView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Pengarang" },
                { view: "button", value: "Print", id: "printPengarang", width: 100 }
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


        // Print Data
        $$("printPengarang").attachEvent("onItemClick", function () {
            window.open("http://202.67.10.181/pengarang/pdf");
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
