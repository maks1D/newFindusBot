exports.output = async ({message, guild, args}) => {
    var random = await ef.utils.number.random(0, 4)

    switch(random){
        case 0: 
        {
            ef.models.send({
                object: message,
                title: `**Jan Sztaudynger - Skarga zmiętego**`,
                message: `Życie mnie Mnie`
            })
            break
        }
        case 1: 
        {
            ef.models.send({
                object: message,
                title: `**Jan Kochanowski - Na dom w Czarnolesie**`,
                message: `Panie, to moja praca, a zdarzenie Twoje;
                Raczysz błogosławieństwo dać do końca swoje.
                Inszy niechaj pałace marmórowe mają
                I szczerym złotogłowiem ściany obijają,
                Ja, Panie, niechaj mieszkam w tym gnieździe ojczystym,
                A ty mię zdrowiem opatrz i sumnieniem czystym,
                Pożywieniem ućciwym, ludzką życzliwością,
                Obyczajmi znośnymi, nieprzykrą starością.`
            })
            break
        }
        case 2: 
        {
            ef.models.send({
                object: message,
                title: `**Jan Kochanowski - O kaznodziei**`,
                message:`Pytano kaznodzieje: "Czemu to, prałacie,
                Nie tak sami żywiecie, jako nauczacie?"
                (A miał doma kucharkę.) I rzecze: "Mój panie,
                Kazaniu sie nie dziwuj, bo mam pięćset na nie;
                A nie wziąłbych tysiąca, mogę to rzec śmiele,
                Bych tak miał czynić, jako nauczam w kościele"`
            })
            break
        }
        case 3: 
        {
            ef.models.send({
                object: message,
                title: `**Jan Kochanowski - O żywocie ludzkim**`,
                message:`Fraszki to wszytko, cokolwiek myślimy,
                Fraszki to wszytko, cokolwiek czynimy;
                Nie masz na świecie żadnej pewnej rzeczy,
                Prózno tu człowiek ma co mieć na pieczy.
                Zacność, uroda, moc, pieniądże, sława,
                Wszytko to minie jako polna trawa;
                Naśmiawszy się nam i naszym porządkom,
                Wemkną nas w mieszek, jako czynią łątkom.`
            })
            break
        }
        case 4: 
        {
            ef.models.send({
                object: message,
                title: `**Jan Kochanowski - Raki**`,
                message:`Folgujmy paniom nie sobie, ma rada;
                Miłujmy wiernie nie jest w nich przysada
                Godności trzeba nie za nic tu cnota,
                Miłości pragną nie pragną tu złota.
                Miłują z serca nie patrzają zdrady,
                Pilnują prawdy nie kłamają rady.
                Wiarę uprzejmą nie dar sobie ważą,
                W miarę nie nazbyt ciągnąć rzemień każą 
                Wiecznie wam służę nie służę na chwilę,
                Bezpiecznie wierzcie nie rad ja omylę`
            })
            break
        }
    }
}

exports.data = {
    triggers: ['fraszka', 'trifle', 'flaszka'],
    description: 'Przywołuje fraszkę.',
    usage: [
        '{prefix}{command}'     
    ]
}
