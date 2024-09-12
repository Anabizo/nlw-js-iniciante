const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem-vindo(a) ao App de Metas"

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite sua meta"})

    if (meta.length == 0){
        mensagem = "A meta não pode ser vazia!!"
        return
    }

    metas.push({value: meta, checked: false})

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false        
    });

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    });

    mensagem = "Meta(s) marcada(s) com sucesso!"

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = "Nenhuma meta realizada!!"
        return
    }

    await select({
        message: realizadas.length + " Metas realizadas:",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if (abertas.length == 0) {
        mensagem = "Nenhuma meta aberta!!"
        return
    }

    await select({
        message: abertas.length + " Metas abertas:",
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    
    const desmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const aDeletar = await checkbox({
        message: "Seleciones metas para deletar",
        choices: [...desmarcadas],
        instructions: false,
    })

    if (aDeletar == 0) {
        mensagem = "Nenhuma meta a deletar!"
    }

    aDeletar.forEach((item) => {
        metas = metas.filter((m) => {
            return m.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!!"

}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {

    while(true) {

        mostrarMensagem()

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
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("até a próxima")
                return
            
        }
    }

}

start();