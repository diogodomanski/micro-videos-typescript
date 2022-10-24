export class Endereco {
    readonly pais: Pais;
    readonly uf: UF;
    readonly municipio: Municipio;
    readonly tipoLogradouro: TipoLogradouro;
    readonly tituloLogradouro?: TituloLogradouro;
    readonly nomeLogradouro: string;
    readonly numeroLogradouro: string;
    readonly modificadorNumeroLogradouro?: string;
    readonly complemento: Complemento;
    readonly bairro: string;
    readonly cep: string;
    readonly latitude: number;
    readonly longitude: number;

    constructor(props: any) {
        this.pais = props.pais;
        this.uf = props.uf;
        this.municipio = props.municipio;
        this.tipoLogradouro = props.tipoLogradouro;
        this.tituloLogradouro = props.tituloLogradouro;
        this.nomeLogradouro = props.nomeLogradouro;
        this.numeroLogradouro = props.numeroLogradouro;
        this.modificadorNumeroLogradouro = props.modificadorNumeroLogradouro;
        this.complemento = props.complemento;
        this.bairro = props.bairro;
        this.cep = props.cep;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.validate();
    }

    protected validate() {

    }

    toString(): string {
        let strEndereco: string = this.tipoLogradouro.toString();

        if (this.tituloLogradouro) {
            strEndereco += ` ${this.tituloLogradouro.toString()}`;
        }

        strEndereco += ` ${this.nomeLogradouro}`;

        if (this.numeroLogradouro) {
            strEndereco += ` ${this.numeroLogradouro}`;

            if (this.modificadorNumeroLogradouro) {
                strEndereco += `${this.modificadorNumeroLogradouro}`;
            }
        }

        const strComplemento = this.complemento.toString({
            ala: "Ala",
            alamedaInterna: "Alameda Interna",
            // ... encontrar uma forma de associar cada tipo de complemento com a tradução para o idioma correto
        });

        if (strComplemento) {
            strEndereco += ` ${strComplemento}`;
        }

        if (this.bairro) {
            strEndereco += ` ${this.bairro}`;
        }

        strEndereco += ` ${this.bairro}`;
        strEndereco += ` ${this.cep}`;
        strEndereco += ` ${this.municipio.toString()}`;
        strEndereco += ` ${this.uf.toString()}`;
        strEndereco += ` ${this.pais.toString()}`;

        return strEndereco.trim();
    }
}

export class Pais { }
export class UF { }
export class Municipio { }
export class TipoLogradouro { }
export class TituloLogradouro { }
export class Complemento {
    ala?: string;
    alamedaInterna?: string;
    andar?: string;
    anexo?: string;
    apartamento?: string;
    armazem?: string;
    avenidaInterna?: string;
    banca?: string;
    barraca?: string;
    barracao?: string;
    bloco?: string;
    box?: string;
    cabine?: string;
    cais?: string;
    casa?: string;
    chacara?: string;
    chale?: string;
    cobertura?: string;
    comodo?: string;
    conjunto?: string;
    dependencia?: string;
    deposito?: string;
    edificio?: string;
    entrada?: string;
    estancia?: string;
    fazenda?: string;
    frente?: string;
    fundos?: string;
    galeria?: string;
    garagem?: string;
    granja?: string;
    grupo?: string;
    guiche?: string;
    habitacao?: string;
    hangar?: string;
    lado?: string;
    laje?: string;
    loja?: string;
    lote?: string;
    mansao?: string;
    modulo?: string;
    outros?: string;
    pavilhao?: string;
    pavimento?: string;
    peca?: string;
    porao?: string;
    porta?: string;
    portao?: string;
    predio?: string;
    quadra?: string;
    quarto?: string;
    quinta?: string;
    quitinete?: string;
    ruaInterna?: string;
    sala?: string;
    sede?: string;
    sitio?: string;
    sobrado?: string;
    sobreloja?: string;
    subsolo?: string;
    sucam?: string;
    suite?: string;
    terreo?: string;
    travessaInterna?: string;

    toString(dictionary: any): string {
        let strComplemento = "";
        let strSeparator = "";

        for (let item in this) {
            if (typeof this[item] === "string") {
                strComplemento += `${strSeparator} ${dictionary[item]} ${this[item]}`;
                strSeparator = " ";
            } else if (typeof this[item] === "boolean" && this[item] === true) {
                strComplemento += `${strSeparator} ${dictionary[item]}`;
                strSeparator = " ";
            }
        }

        return strComplemento;
    }
}