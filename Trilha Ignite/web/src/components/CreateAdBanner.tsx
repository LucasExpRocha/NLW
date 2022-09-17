import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';

interface CreateAdBannerProps {
    title: string;
    subtitle: string;
    buttonTitle: string;
}

export function CreateAdBanner(props: CreateAdBannerProps){
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
                <div>
                    <strong className='text-2xl text-white font-black block'>{props.title}</strong>
                    <span className='text-zinc-400 '>{props.subtitle}</span>
                </div>
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
                    <MagnifyingGlassPlus size={(24)}/>
                    {props.buttonTitle}
                </Dialog.Trigger>
            </div>
        </div>
    )
}