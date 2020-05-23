exports.output = async ({message, guild, args}) => {

    if(guild.settings.language == 'pl') {
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
                    message: `
Panie, to moja praca, a zdarzenie Twoje;
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
                    message: `
Pytano kaznodzieje: "Czemu to, prałacie,
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
                    message: `
Fraszki to wszytko, cokolwiek myślimy,
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
                    message: `
Folgujmy paniom nie sobie, ma rada;
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
    } else if (guild.settings.language == 'en') {
        var random = await ef.utils.number.random(0, 11)

        switch(random)
        {
            case 0:
            {
                ef.models.send({
                    object: message,
                    title: `**Samuel Taylor Coleridge - Epigram**`,
                    message: `
What is an Epigram? a dwarfish whole,
Its body brevity, and wit its soul.`
                })
                break
            }
            case 1:
            {
                ef.models.send({
                    object: message,
                    title: `**Alfred Edward Houseman -** *Unnamed*`,
                    message: `
Some can gaze and not be sick
But I could never learn the trick.
There's this to say for blood and breath;
They give a man a taste for death.`
                })
                break
            }
            case 2:
            {
                ef.models.send({
                    object: message,
                    title: `**Benjamin Franklin -** *Unnamed*`,
                    message: `
Little strokes
Fell great oaks.`
                })
                break
            }
            case 3:
            {
                ef.models.send({
                    object: message,
                    title: `**John Dryden -** *Unnamed*`,
                    message: `
Here lies my wife: here let her lie!
Now she's at rest – and so am I.`
                })
                break
            }
            case 4:
            {
                ef.models.send({
                    object: message,
                    title: `**John Dryden - Epigram on Milton**`,
                    message: `
Three Poets, in three distant Ages born,
Greece, Italy, and England did adorn.
The First in loftiness of thought surpassed;
The Next in Majesty; in both the Last.
The force of Nature could no farther go:
To make a third she joined the former two.`
                })
                break
            }
            case 5:
            {
                ef.models.send({
                    object: message,
                    title: `**John Wilmot - Epigram about Charles II of England**`,
                    message: `
We have a pretty witty king,
Whose word no man relies on.
He never said a foolish thing,
And never did a wise one.`
                })
                break
            }
            case 6:
            {
                ef.models.send({
                    object: message,
                    title: `**Alexander Pope -** *Unnamed*`,
                    message: `
I am His Highness' dog at Kew;
Pray tell me, sir, whose dog are you?`
                })
                break
            }
            case 7:
            {
                ef.models.send({
                    object: message,
                    title: `**Hilaire Belloc -** *Unnamed*`,
                    message: `
I'm tired of Love: I'm still more tired of Rhyme.
But Money gives me pleasure all the time.`
                })
                break
            }
            case 8:
            {
                ef.models.send({
                    object: message,
                    title: `**Nikos Kazantzakis -** *Unnamed*`,
                    message: `I hope for nothing. I fear nothing. I am free.`
                })
                break
            }
            case 9:
            {
                ef.models.send({
                    object: message,
                    title: `**Charles Robert Anon (Fernando Pessoa) -** *Unnamed*`,
                    message: `To define the beautiful is to misunderstand it.`
                })
                break
            }
            case 10:
            {
                ef.models.send({
                    object: message,
                    title: `**J.V. Cunningham -** *Unnamed*`,
                    message: `
This Humanist whom no belief constrained
Grew so broad-minded he was scatter-brained.`
                })
                break
            }
            case 11:
            {
                ef.models.send({
                    object: message,
                    title: `**Stevie Smith -** *Unnamed*`,
                    message: `
All things pass
Love and mankind is grass.`
                })
                break
            }
        }
    } else if (guild.settings.language == 'ru') {
        var random = await ef.utils.number.random(0, 3)

        switch(random)
        {
            case 0:
            {
                ef.models.send({
                    object: message,
                    title: `**Бёрнс -** *неназванный*`,
                    message: `
О ты, кого поэзия изгнала,
Кто в нашей прозе места не нашёл.
Ты слышишь крик поэта Марциала:
«Разбой! Грабеж! Меня он перевёл!»`
                })
                break
            }
            case 1:
            {
                ef.models.send({
                    object: message,
                    title: `**Н. М. Карамзин - Ноги**`,
                    message: `
Когда любовь без ног? Как надобно идти
От друга милого, сказав ему: «Прости!»`
                })
                break
            }
            case 2:
            {
                ef.models.send({
                    object: message,
                    title: `**А. С. Пушкин - На М. С. Воронцова**`,
                    message: `
Полу-милорд, полу-купец,
Полу-мудрец, полу-невежда,
Полу-подлец, но есть надежда,
Что будет полным наконец.`
                })
                break
            }
            case 3:
            {
                ef.models.send({
                    object: message,
                    title: `**А. С. Пушкин - На Дондукова-Корсакова**`,
                    message: `
В Академии наук
Заседает князь Дундук.
Говорят, не подобает
Дундуку такая честь;
Почему ж он заседает?
Потому что есть чем сесть.`
                })
                break
            }
        }
    }
}

exports.data = {
    triggers: ['epigram', 'fraszka'],
    description: {
        pl: 'Przywołuje fraszkę.',
        en: 'Summons epigram.',
        ru: 'Призывает эпиграмму'
    },
    usage: [
        '{prefix}{command}'     
    ]
}
