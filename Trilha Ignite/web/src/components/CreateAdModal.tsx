import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/input";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useEffect, useState, FormEvent } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from 'axios'

export function CreateAdModal() {
  const [games, setGames] = useState<GameProps[]>([]);
  const [weekDays, setWeekDays] = useState<String[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  interface GameProps {
    id: string;
    title: string;
  }

  useEffect(() => {
    axios("http://localhost:3636/games")
      .then((response) => setGames(response.data));
  }, []);

    async  function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name && !data.id) {
        console.log('Form Vazio')
        return
    }

    try {
        await axios.post(`http://localhost:3636/games/${data.game}/ads`, {
            name: data.name,
            yearPlaying: Number(data.yearPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
        })

    alert(`Successfully created`)

    } catch (error) {
        console.log(error);
        alert('Erro ao enviar os dados, tente novamente mais tarde.')
        }
  } 

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="bg-[#2A2634] fixed py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-lg shadow-white/10 z-40">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio.
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue={""}
            >
              <option disabled value="">
                Selecione o game que deseja jogar{" "}
              </option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearPlaying"
                name="yearPlaying"
                placeholder="Tudo bem ser Zero"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-1"
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`p-2 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`p-2 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`p-2 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`p-2 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`p-2 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`p-2 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`p-2 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horario do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" id="hourStart" name="hourStart" placeholder="De" />
                <Input type="time" id="hourEnd" name="hourEnd" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2">
            <Checkbox.Root 
                className="w-6 h-6 rounded bg-zinc-900 "
                onCheckedChange={(checked) => {
                    if (checked === true) setUseVoiceChannel(true)
                    else setUseVoiceChannel(false)
                }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400 m-auto" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costuma se conectar ao chat de voz?
          </label>

          <footer className="flex self-end gap-2">
            <Dialog.Close className="font-semibold bg-zinc-500 px-5 h-12 rounded-md hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="font-semibold bg-violet-500 px-5 h-12 flex rounded-md items-center gap-1 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
