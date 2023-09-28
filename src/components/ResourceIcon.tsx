import { AiOutlineLink } from 'react-icons/ai';
import { FaInstagram, FaTelegramPlane, FaVk, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Button } from './ui/Button';

export const icons = {
  'instagram.com': FaInstagram,
  't.me': FaTelegramPlane,
  'vk.com': FaVk,
  'youtube.com': FaYoutube,
  'youtu.be': FaYoutube,
  'tiktok.com': SiTiktok,
} as const;

const getMainDomain = (url: string) => {
  try {
    const host = new URL(url).hostname;
    return host.split('.').slice(-2).join('.');
  } catch (e) {
    return null;
  }
};

const ResourceIcon = ({ url }: { url: string }) => {
  const host = getMainDomain(url);
  const IconComponent = icons[host as keyof typeof icons] ?? AiOutlineLink;

  return (
    <Button
      variant={'secondary'}
      size={'icon'}
      className='h-12 w-12 rounded-full'
      asChild
    >
      <a href={url} target='_blank' rel='noreferrer'>
        <IconComponent size={18} />
      </a>
    </Button>
  );
};

export default ResourceIcon;
