import { JetView } from "webix-jet";
import jendelaBuku from "views/jendela/jendelaBuku";

export default class BukuView extends JetView {
    config() {
        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Buku" },
                { view: "button", value: "Print", id: "printBuku", width: 100 }
            ]
        };

        var halaman = {
            view: "datatable",
            id: "tabelBuku",
            select: true,
            columns: [
                { id: "id", header: "ID", width: 200 },
                { id: "nama_buku", header: "Nama Buku", width: 200 },
                { id: "jenis_buku", header: "Jenis" },
                { id: "pengarang", header: "Pengarang", width: 200 },
                { id: "harga", header: "Harga" }
            ],
            pager: "paginasi",
            url: "http://202.67.10.181/buku",
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
                    $$("tabelBuku").clearAll();
                    $$("tabelBuku").load("http://202.67.10.181/buku");
                    $$('jendelaBuku').hide();
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
        $$("printBuku").attachEvent("onItemClick", function () {
            window.open("http://202.67.10.181/buku/pdf");
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
