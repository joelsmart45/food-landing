export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          email: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          email?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          email?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          sku: string | null;
          name: string;
          description: string | null;
          price: number;
          currency: string;
          image_url: string | null;
          availability: boolean;
          stock_quantity: number | null;
          unit: string;
          ingredients: string | null;
          allergens: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          sku?: string | null;
          name: string;
          description?: string | null;
          price: number;
          currency?: string;
          image_url?: string | null;
          availability?: boolean;
          stock_quantity?: number | null;
          unit?: string;
          ingredients?: string | null;
          allergens?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          sku?: string | null;
          name?: string;
          description?: string | null;
          price?: number;
          currency?: string;
          image_url?: string | null;
          availability?: boolean;
          stock_quantity?: number | null;
          unit?: string;
          ingredients?: string | null;
          allergens?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_options: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          additional_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          additional_price?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          additional_price?: number;
          created_at?: string;
        };
      };
      delivery_zones: {
        Row: {
          id: string;
          name: string;
          fee: number;
          estimated_delivery_time: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          fee?: number;
          estimated_delivery_time?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          fee?: number;
          estimated_delivery_time?: string | null;
          active?: boolean;
          created_at?: string;
        };
      };
      promotions: {
        Row: {
          id: string;
          code: string;
          discount_type: string;
          discount_value: number;
          minimum_order_amount: number;
          usage_limit: number | null;
          used_count: number;
          start_at: string | null;
          end_at: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          discount_type: string;
          discount_value: number;
          minimum_order_amount?: number;
          usage_limit?: number | null;
          used_count?: number;
          start_at?: string | null;
          end_at?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          discount_type?: string;
          discount_value?: number;
          minimum_order_amount?: number;
          usage_limit?: number | null;
          used_count?: number;
          start_at?: string | null;
          end_at?: string | null;
          active?: boolean;
          created_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          recipient: string;
          phone: string;
          address_line: string;
          city: string;
          state: string;
          instructions: string | null;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          recipient: string;
          phone: string;
          address_line: string;
          city: string;
          state: string;
          instructions?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          recipient?: string;
          phone?: string;
          address_line?: string;
          city?: string;
          state?: string;
          instructions?: string | null;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      carts: {
        Row: {
          id: string;
          user_id: string | null;
          session_id: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          session_id?: string | null;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          product_option_id: string | null;
          quantity: number;
          unit_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          product_option_id?: string | null;
          quantity?: number;
          unit_price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_id?: string;
          product_option_id?: string | null;
          quantity?: number;
          unit_price?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_reference: string;
          user_id: string | null;
          status: string;
          subtotal: number;
          delivery_fee: number;
          discount: number;
          total: number;
          payment_status: string;
          delivery_method: string;
          delivery_address_id: string | null;
          delivery_instructions: string | null;
          preferred_delivery_at: string | null;
          payment_method: string | null;
          payment_reference: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_reference?: string;
          user_id?: string | null;
          status?: string;
          subtotal: number;
          delivery_fee?: number;
          discount?: number;
          total: number;
          payment_status?: string;
          delivery_method: string;
          delivery_address_id?: string | null;
          delivery_instructions?: string | null;
          preferred_delivery_at?: string | null;
          payment_method?: string | null;
          payment_reference?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_reference?: string;
          user_id?: string | null;
          status?: string;
          subtotal?: number;
          delivery_fee?: number;
          discount?: number;
          total?: number;
          payment_status?: string;
          delivery_method?: string;
          delivery_address_id?: string | null;
          delivery_instructions?: string | null;
          preferred_delivery_at?: string | null;
          payment_method?: string | null;
          payment_reference?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name_snapshot: string;
          unit_price: number;
          quantity: number;
          options: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name_snapshot: string;
          unit_price: number;
          quantity?: number;
          options?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name_snapshot?: string;
          unit_price?: number;
          quantity?: number;
          options?: Json;
          created_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          provider: string;
          provider_reference: string | null;
          amount: number;
          currency: string;
          status: string;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          provider: string;
          provider_reference?: string | null;
          amount: number;
          currency?: string;
          status?: string;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          provider?: string;
          provider_reference?: string | null;
          amount?: number;
          currency?: string;
          status?: string;
          paid_at?: string | null;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          order_id: string | null;
          channel: string;
          status: string;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_id?: string | null;
          channel: string;
          status?: string;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_id?: string | null;
          channel?: string;
          status?: string;
          sent_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_order_reference: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };
