import { supabase } from './supabase';
import { Building, Event as DBEvent } from '../types/database';
import { EventItem } from '../data/events';
import {
    Gift,
    Mic2,
    MessageCircle,
    Camera,
    Video,
    Sparkles,
    Calendar,
    MapPin,
    Play,
    CalendarClock,
    Plus
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, any> = {
    Gift,
    Mic2,
    MessageCircle,
    Camera,
    Video,
    Sparkles,
    Calendar,
    MapPin,
    Play,
    CalendarClock,
    Plus
};

export async function getNews(): Promise<string[]> {
    const { data, error } = await supabase
        .from('news')
        .select('details')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching news:', error);
        return [];
    }

    return data.map(item => item.details);
}

export async function getBuildings(): Promise<Building[]> {
    const { data, error } = await supabase
        .from('buildings')
        .select('*, apartments(*)');

    if (error) {
        console.error('Error fetching buildings:', error);
        return [];
    }

    return data as Building[];
}

export async function getBuildingById(id: string): Promise<Building | null> {
    console.log(`Fetching building with ID: ${id} (type: ${typeof id})`);

    const { data, error } = await supabase
        .from('buildings')
        .select('*, apartments(*)')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching building with id ${id}:`, error);
        // Fallback: Try fetching all and filtering (debug only)
        const { data: all } = await supabase.from('buildings').select('id');
        console.log('Available IDs:', all);
        return null;
    }

    return data as Building;
}

// Helper to map DB Event to UI EventItem
function mapEventFromDB(event: DBEvent): EventItem {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        status: event.status,
        date: event.date_details, // Map date_details to date
        features: event.features.map(f => ({
            ...f,
            icon: iconMap[f.icon] || Gift // Fallback to Gift if icon not found
        }))
    };
}

export async function getEvents(): Promise<EventItem[]> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching events:', JSON.stringify(error, null, 2));
        return [];
    }

    return (data as DBEvent[]).map(mapEventFromDB);
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching event with id ${id}:`, error);
        return undefined;
    }

    return mapEventFromDB(data as DBEvent);
}
