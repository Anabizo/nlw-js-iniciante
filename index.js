const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const CadastrarMeta = async () => {
    const meta = await input({message: "Digite sua meta"})

    if (meta.length == 0){
        console.log("A meta não pode ser vazia!!")
        return
    }

    metas.push({value: meta, checked: false})
}

const ListarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false        
    });

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    });

    console.log("Meta(s) marcada(s) com sucesso!")

}

const MetasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log("Nenhuma meta realizada!!")
        return
    }

    await select({
        message: "Metas realizadas:",
        choices: [...realizadas]
    })
}

const MetasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if (abertas.length == 0) {
        console.log("Nenhuma meta aberta!!")
        return
    }

    await select({
        message: abertas.length + "Metas abertas:",
        choices: [...abertas]
    })
}

const start = async () => {

    while(true) {

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await CadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await ListarMetas()
                break
            case "realizadas":
                await MetasRealizadas()
                break
            case "abertas":
                await MetasAbertas()
                break
            case "sair":
                console.log("até a próxima")
                return
            
        }
    }

}

start();