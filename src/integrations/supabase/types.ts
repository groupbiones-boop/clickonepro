export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      alert_rules: {
        Row: {
          condition: Json
          created_at: string | null
          enabled: boolean | null
          id: string
          name: string
          type: string
        }
        Insert: {
          condition: Json
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          name: string
          type: string
        }
        Update: {
          condition?: Json
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          event_type: string
          id: string
          lat: number | null
          lon: number | null
          os: string | null
          page_path: string
          page_title: string | null
          referrer: string | null
          region: string | null
          screen_height: number | null
          screen_width: number | null
          scroll_depth: number | null
          session_id: string
          time_on_page: number | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_type: string
          id?: string
          lat?: number | null
          lon?: number | null
          os?: string | null
          page_path: string
          page_title?: string | null
          referrer?: string | null
          region?: string | null
          screen_height?: number | null
          screen_width?: number | null
          scroll_depth?: number | null
          session_id: string
          time_on_page?: number | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_type?: string
          id?: string
          lat?: number | null
          lon?: number | null
          os?: string | null
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          region?: string | null
          screen_height?: number | null
          screen_width?: number | null
          scroll_depth?: number | null
          session_id?: string
          time_on_page?: number | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          category_id: string | null
          content: string
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: number | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author?: string | null
          category_id?: string | null
          content: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author?: string | null
          category_id?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_bookings: {
        Row: {
          company: string | null
          confirmation_sent_at: string | null
          created_at: string
          email: string
          id: string
          lead_id: string | null
          name: string | null
          notes: string | null
          phone: string | null
          scheduled_at: string
          source: string | null
          status: string
          timezone: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          confirmation_sent_at?: string | null
          created_at?: string
          email: string
          id?: string
          lead_id?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          scheduled_at: string
          source?: string | null
          status?: string
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          confirmation_sent_at?: string | null
          created_at?: string
          email?: string
          id?: string
          lead_id?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          scheduled_at?: string
          source?: string | null
          status?: string
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "demo_bookings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_pages: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          images: Json | null
          name: string
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json
          created_at?: string | null
          id?: string
          images?: Json | null
          name: string
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          images?: Json | null
          name?: string
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string | null
          phone: string | null
          source: string | null
          status: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      lp_ab_sessions: {
        Row: {
          converted: boolean | null
          created_at: string | null
          id: string
          session_id: string
          test_id: string
          variant: string
        }
        Insert: {
          converted?: boolean | null
          created_at?: string | null
          id?: string
          session_id: string
          test_id: string
          variant: string
        }
        Update: {
          converted?: boolean | null
          created_at?: string | null
          id?: string
          session_id?: string
          test_id?: string
          variant?: string
        }
        Relationships: [
          {
            foreignKeyName: "lp_ab_sessions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "lp_ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_ab_tests: {
        Row: {
          confidence_level: number | null
          created_at: string | null
          end_date: string | null
          goal_target: string | null
          goal_type: string | null
          id: string
          landing_page_id: string
          name: string
          start_date: string | null
          status: string | null
          traffic_split: number | null
          updated_at: string | null
          variant_a_content: Json | null
          variant_a_conversions: number | null
          variant_a_views: number | null
          variant_b_content: Json
          variant_b_conversions: number | null
          variant_b_views: number | null
          winner: string | null
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string | null
          end_date?: string | null
          goal_target?: string | null
          goal_type?: string | null
          id?: string
          landing_page_id: string
          name: string
          start_date?: string | null
          status?: string | null
          traffic_split?: number | null
          updated_at?: string | null
          variant_a_content?: Json | null
          variant_a_conversions?: number | null
          variant_a_views?: number | null
          variant_b_content: Json
          variant_b_conversions?: number | null
          variant_b_views?: number | null
          winner?: string | null
        }
        Update: {
          confidence_level?: number | null
          created_at?: string | null
          end_date?: string | null
          goal_target?: string | null
          goal_type?: string | null
          id?: string
          landing_page_id?: string
          name?: string
          start_date?: string | null
          status?: string | null
          traffic_split?: number | null
          updated_at?: string | null
          variant_a_content?: Json | null
          variant_a_conversions?: number | null
          variant_a_views?: number | null
          variant_b_content?: Json
          variant_b_conversions?: number | null
          variant_b_views?: number | null
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_ab_tests_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      lp_campaigns: {
        Row: {
          avg_conversion_value: number | null
          created_at: string | null
          currency: string | null
          end_date: string
          goal_conversions: number | null
          goal_pageviews: number | null
          goal_reach: number | null
          goal_revenue: number | null
          goal_visitors: number | null
          id: string
          landing_page_id: string | null
          name: string
          page_path: string | null
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avg_conversion_value?: number | null
          created_at?: string | null
          currency?: string | null
          end_date: string
          goal_conversions?: number | null
          goal_pageviews?: number | null
          goal_reach?: number | null
          goal_revenue?: number | null
          goal_visitors?: number | null
          id?: string
          landing_page_id?: string | null
          name: string
          page_path?: string | null
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avg_conversion_value?: number | null
          created_at?: string | null
          currency?: string | null
          end_date?: string
          goal_conversions?: number | null
          goal_pageviews?: number | null
          goal_reach?: number | null
          goal_revenue?: number | null
          goal_visitors?: number | null
          id?: string
          landing_page_id?: string | null
          name?: string
          page_path?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_campaigns_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          severity: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          severity?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          severity?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      scheduled_reports: {
        Row: {
          created_at: string | null
          day_of_week: number | null
          enabled: boolean | null
          frequency: string
          hour: number | null
          id: string
          last_sent_at: string | null
          name: string
          recipients: Json
          sections: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: number | null
          enabled?: boolean | null
          frequency?: string
          hour?: number | null
          id?: string
          last_sent_at?: string | null
          name: string
          recipients?: Json
          sections?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number | null
          enabled?: boolean | null
          frequency?: string
          hour?: number | null
          id?: string
          last_sent_at?: string | null
          name?: string
          recipients?: Json
          sections?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_publish_scheduled_posts: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_ab_views: {
        Args: { p_test_id: string; p_variant: string }
        Returns: undefined
      }
      increment_post_views: { Args: { post_slug: string }; Returns: undefined }
      record_ab_conversion: {
        Args: { p_session_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
