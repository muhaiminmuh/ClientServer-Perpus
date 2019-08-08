import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config(){
		var header = {
			type:"header", template:this.app.config.name, css:"webix_header app_header"
		};

		var menu = {
			view:"menu", id:"top:menu",
			subMenuPos:"right",
			autowidht:true, 
			css:"app_menu",
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon #icon#'></span> #value# ",
			data:[
				{ value:"Dashboard", id:"start", icon:"wxi-columns" },
				{ value:"Data",		 id:"data",  icon:"wxi-pencil" },
				{ value:"Master", id:"buku", icon:"wxi-user", submenu:[
					{ value:"Master Kategori", id:"kategori"},
					{ value:"Master Pengarang", id:"pengarang"},
					{ value:"Master Supplier", id:"supplier"},
					{ value:"Master Buku", id:"buku"},
					// { value:"Master User", id:"user"}
				]},
				{ value:"Transaksi", id:"transaksi", icon:"wxi-user", submenu:[
					{ value: "Penjualan", id: "transaksi" },
					{ value: "Pembelian", id: "pembelian" },
				]},
				{ value:"Laporan", id:"lapbuku", icon:"wxi-user", submenu:[
					{ value: "Lap Kategori", id: "lapkategori" },
					{ value: "Lap Pengarang", id: "lappengarang" },
					{ value: "Lap Supplier", id: "lapsupplier" },
					{ value: "Lap Buku", id: "lapbuku" },
					{ value: "Lap Pembelian", id: "lappembelian" },
					{ value: "Lap Penjualan", id: "laptransaksi" },
				]}
			]
		};

		var ui = { 
			id:"halaman",
			type:"clean", paddingX:5, css:"app_layout", cols:[
				{  paddingX:5, paddingY:10, rows: [ {css:"webix_shadow_medium", rows:[header, menu]} ]},
				{ type:"wide", paddingY:10, paddingX:5, rows:[
					{ $subview:true } 
				]}
			]
		};

		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}