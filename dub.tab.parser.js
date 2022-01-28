// import * as FS from 'fs';
// let source = FS.readFileSync(`P:/Projekte/HiGHmed/Daten/EHR.xml/v1/24167729.--D`, 'utf8');
// let source = FS.readFileSync(`P:/Projekte/HiGHmed/Daten/EHR.xml/v1/16973329.--D`, 'utf8');

source = `
patient 	#asd
	id	61036383
	number	16973329
	birthYear	1967
	sex	F
	case	#JFDA
		ID	5367829
		number	70566451
		admission	2016-12-29T10:19:00
		discharge	2017-01-02T11:17:00
		admissionWeek	2016-52-5
		admissionState	Nachstationär
		admissionType	Entlassen
		diagnosis
			ICD	#D11.0	Gutartige Neubildung: Parotis
			orbisID	241380
		diagnosis
			ICD	D37.0
			text	Neubildung unsicheren oder unbekannten Verhaltens: Lippe, Mundhöhle und Pharynx
			orbisID	241568
		procedure
			OPS	5-262.01
			text	Resektion einer Speicheldrüse: Parotidektomie, partiell: Mit intraoperativem Fazialismonitoring
			time	2016-12-30T11:23:41
			clinicCode	19010
			clinicText	Klinik für Hals-Nasen-Ohrenheilkunde
			orbisID	6184212
		surgery
			code	HNO99
			text	Parotidektomie (HNO)
			location	135821
			clinicCode	19010
			clinic	Klinik für Hals-Nasen-Ohrenheilkunde
			time1	2016-12-30T08:39:03
			time2	2016-12-30T10:00:00
		lab-set
			id	OPUS-0026355342
			time	2016-12-29T14:00:00
			lab-item
				key	Hämatokrit
				val	41.2999992370605
				unit	%
				norm	36.6 - 44
			lab-item
				key	Hämoglobin
				val	13.6000003814697
				unit	g/dl
				norm	11.9 - 14.6
			lab-item
				key	INR
				val	0.920000016689301
				norm	0.85 - 1.15
			lab-item
				key	Leukozyten
				val	6.519999980926509
				unit	Tsd./µl
				norm	4.49 - 12.68
			lab-item
				key	PTT
				val	29
				unit	sek.
				norm	24 - 36
			lab-item
				key	TPZ/Quick
				val	112
				unit	%
				norm	82 - 121
			lab-item
				key	Thrombozyten
				val	165
				unit	Tsd./µl
				norm	173 - 390
		location
			id	13110561
			arrival	2016-12-29T10:19:00
			departure	2016-12-29T11:37:00
			department	Klinik für Hals-Nasen-Ohrenheilkunde
			ward	Station HNO D
		location
			id	13110919
			arrival	2016-12-29T11:37:00
			departure	2017-01-02T11:17:00
			department	Klinik für Hals-Nasen-Ohrenheilkunde
			ward	Station HNO A
			room	HNO-A Zi 303
			bedPosition	Bett 2
			contact
				id	13111872
				caseID	5368265
				from	2016-12-29T18:33:00
				till	2016-12-29T19:17:00
			contact
				id	13112034
				caseID	5368265
				from	2016-12-30T00:40:00
				till	2016-12-30T12:29:00
			contact
				id	13113570
				caseID	5368707
				from	2016-12-30T14:09:00
				till	2016-12-31T13:05:00
			contact
				id	13114746
				caseID	5368707
				from	2016-12-31T19:24:00
				till	2017-01-01T18:53:00
			contact
				id	13115738
				caseID	5367944
				from	2017-01-02T07:04:00
				till	2017-01-02T11:17:00
		location
			id	13144416
			arrival	2017-01-02T11:17:00
			departure	4000-12-31T00:00:00
			department	Klinik für Hals-Nasen-Ohrenheilkunde
		microBiologyReport
			orderNumber	70933409
			bicsan
				patientID	61036383
				caseNumber	70566451
			request
				time	2016-12-29T14:23:13
				content	MRSA
			result
				time	2017-01-01
				content	Kulturell kein Nachweis von Methicillin-resistentem Staphylococcus aureus.
			sender
				opusID	6843
				name	HNO-Klinik,Station D,
			sample
				opusID	ao
				time	2016-12-29T10:38:37
				location	nara
				description	Abstrich-oberflächlich
			analyses
				germ
					analysis
						opusID	amrsa
						name	Selektivagar MRSA
						result	negativ
					analysis
						opusID	amrsa2
						name	Selektivagar MRSA 2.Tag
						result	negativ
					analysis
						opusID	bmrsa
						name	Selektiv-Bouillon-MRSA
						result	negativ
`;



class DubTab {
    _ = [];
    level = 0;
    constructor(key, ID, value) {
        if(key) this.key = key;
        if(ID) this.ID = ID;
        if(value) this.value = value;
        this.level = 0;
    }
    addChild(child) {
        console.log('add child', this.key, child.key);
        child.parent = this;
        child.level = this.level + 1;
        // this._[child.ID] = child;
        this._.push(child);
	}
	get stack(){
		let list = [];
		for(let node=this; node; node=node.parent) list.unshift(node);//console.log("LIST",node);
		// let node = this;
		// while(node)
		// 	list.unshift(node = node.parent);
		// 	console.log('LIST',list);
		return list;
	}
	path(ID=false){
		// let node = this;
		// let path = [];
		return this.stack.map(node=>(node.key?node.key:'') + ((ID&&Boolean(node.ID))?'#'+node.ID:'')).join('/');
		// this.root(node=>path.unshift((node.key?node.key:'') + ((ID&&Boolean(node.ID))?'#'+node.ID:'')))
		// while (node) {
		// 	// console.log('path',ID,node.ID, (ID&&Boolean(node.ID))==1);
		// 	path.unshift((node.key?node.key:'') + ((ID&&Boolean(node.ID))?'#'+node.ID:''));
		// 	node = node.parent;
		// }
		// return path.join('/');
	}
	$(path){
		//case/diagnosis#F12.2
		//lab/result[key=kalium && value=5.4]
		//lab/result/key=kalium/../value=5.4/../
		//lab/result/key=kalium && value=5.4/../
		let out = [];
		// .match(/.{1,2}/g)
		out = path.split('//').map(p=>({typ:'//',q:p}));
		console.log("$$$$",path,path.substr(1).search(/\/{1,2}/g));
		return out;
	}
    add(text) {
        var last = this;
        for (let line of text.split('\n')) {
            if (!line.trim()) continue;
            let current = new DubTab();
            current.level++;
            // let level = 1;
            let tabs = line.split('\t');
            // console.log(tabs);
            // for (var tab = tabs.shift(); tab ==='' ; level++) console.log(level,'-'+tab+'-');
            while (1) {
                var tab = tabs.shift();
                // console.log('tab', tab);
                if (tab.trim()) break;
                else current.level++;
                // console.log(level, '-' + tab + '-');
            }
            console.log('tab',tab);
            if (tab.startsWith('#')) current.ID = tab.trim().substr(1);
            else current.key = tab.trim();
            if(!current.ID && tabs.length && tabs[0].startsWith('#')) current.ID = tabs.shift().trim().substr(1);
            // if (tabs.length > 1) current.value = tabs;
            // else current.value = tabs[0];
			current.value = tabs[0];
            if (current.level > last.level) last.addChild(current);
            if (current.level == last.level) last.parent.addChild(current);
            if (current.level < last.level) {
                while (current.level < last.level) 
                    last = last.parent;
                // console.log('parent', current.level, last.key, last.level);
                last.parent.addChild(current);
            }
            last = current;
            console.log(last.toString());
            // console.log('tab', tab, level);
        } // for     
    } // add

    toString() {
        console.log(this.level, this.key, this.ID, this.value);
    }

}

var ROOT = new DubTab();
ROOT.add(source);
console.log(ROOT);
console.log(ROOT._[0]._[4]._[7]._[0])
console.log(ROOT._[0]._[4]._[7]._[0].path(1))




console.log(ROOT.$('/patient#asd//diagnosis/ICD#D11.0'));
// console.log( ROOT.$(ROOT._[0]._[4]._[7]._[0].path(1)) );




// function parse(text){


// }


// for (let line of source.split('\n')) {
//     let key = null;
//     let ID = null;
//     let level = 0;
//     for(let tab of line.split('\t')){
//         if(tab.trim()){ // tab has content
//             if(tab.startsWith('#')) ID = tab;
//             if(key===null) key = tab;
//         } else { // tab is empty
//             if(key===null) level++;
//         }
//         console.log('tab',tab, level);
//     }

// }


