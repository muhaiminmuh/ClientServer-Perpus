import { JetView } from "webix-jet";
import jendelaTransaksi from "views/jendela/jendelaTransaksi";

export default class TransaksiView extends JetView {
    config() {

        var header = {
            view: "toolbar",
            cols: [
                { view: "label", label: "Transaksi" },
                { view: "button", value: "Print", id: "printTransaksi", width: 100 },
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



        // Print Data
        $$("printTransaksi").attachEvent("onItemClick", function () {
            window.open("http://202.67.10.181/transaksi/pdf");
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
