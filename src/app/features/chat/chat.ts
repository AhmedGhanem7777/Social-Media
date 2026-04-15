import { afterNextRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/services/Language/language-service';
import { FormsModule } from '@angular/forms';
// ── Types ──────────────────────────────────────────────────────────────────
interface ConvUser { name: string; avatar: string; online: boolean; }
interface Conversation {
  id: number;
  user: ConvUser;
  lastMessage: string;
  time: string;
  unread: number;
}
interface ChatMessage {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

// ── Static data ────────────────────────────────────────────────────────────
const conversations: Conversation[] = [
  { id: 1, user: { name: 'Sarah Ahmed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', online: true }, lastMessage: "That sounds great! Let me know when you're free 😊", time: '2m', unread: 2 },
  { id: 2, user: { name: 'Omar Hassan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', online: true }, lastMessage: 'Did you see the new design?', time: '15m', unread: 0 },
  { id: 3, user: { name: 'Layla Noor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', online: false }, lastMessage: 'Thanks for sharing!', time: '1h', unread: 0 },
  { id: 4, user: { name: 'Ahmed Khalil', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', online: false }, lastMessage: 'See you tomorrow!', time: '3h', unread: 0 },
];

const chatMessages: ChatMessage[] = [
  { id: 1, sender: 'other', text: 'Hey! How are you doing?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: "I'm doing great, thanks! Just finished working on that project we discussed.", time: '10:32 AM' },
  { id: 3, sender: 'other', text: 'Oh amazing! Can you share the details?', time: '10:33 AM' },
  { id: 4, sender: 'me', text: "Sure! I'll send you the files right away 📎", time: '10:35 AM' },
  { id: 5, sender: 'other', text: "That sounds great! Let me know when you're free 😊", time: '10:36 AM' },
];
@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  readonly lang = inject(LanguageService);

  // ── Template ref for auto-scroll ──────────────────────────────────────────
  readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  // ── State ─────────────────────────────────────────────────────────────────
  readonly conversations = conversations;
  readonly messages = chatMessages;

  selectedChat = signal<Conversation | null>(null);
  showMobileChat = signal(false);
  messageText = '';

  constructor() {
    // Scroll to bottom after view renders
    afterNextRender(() => this.scrollToBottom());
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  selectConversation(conv: Conversation): void {
    this.selectedChat.set(conv);
    this.showMobileChat.set(true);
    // Give DOM a tick to render messages before scrolling
    setTimeout(() => this.scrollToBottom(), 50);
  }

  sendMessage(): void {
    if (!this.messageText.trim()) return;
    // Here you would push to messages array / call service
    this.messageText = '';
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private scrollToBottom(): void {
    const el = this.messagesContainer()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
