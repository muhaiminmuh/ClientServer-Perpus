import { JetView } from "webix-jet";
import jendelaKategori from "views/jendela/jendelaKategori";

export default class KategoriView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Kategori" },
                { view: "button", value: "Print", id: "printKategori", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelKategori",
            select: true,
            columns: [
                { id: "id", header: "ID" },
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


        // Print Data
        $$("printKategori").attachEvent("onItemClick", function () {
            window.open("http://202.67.10.181/kategori/pdf");
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
