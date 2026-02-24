import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Send,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
type LeadSource = "contact" | "intake" | "chat" | "lot_feasibility";

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  contacted: { label: "Contacted", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  qualified: { label: "Qualified", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  proposal: { label: "Proposal", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200" },
  won: { label: "Won", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  lost: { label: "Lost", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

const SOURCE_CONFIG: Record<LeadSource, { label: string; icon: typeof Mail }> = {
  contact: { label: "Contact Form", icon: Mail },
  intake: { label: "Get Started", icon: User },
  chat: { label: "Live Chat", icon: MessageSquare },
  lot_feasibility: { label: "Lot Feasibility", icon: Search },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  );
}

function SourceBadge({ source }: { source: LeadSource }) {
  const config = SOURCE_CONFIG[source];
  const Icon = config.icon;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function StatsCards({ stats }: { stats: Record<string, number> }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      {[
        { key: "total", label: "Total Leads", accent: false },
        { key: "new", label: "New", accent: true },
        { key: "contacted", label: "Contacted", accent: false },
        { key: "qualified", label: "Qualified", accent: false },
        { key: "proposal", label: "Proposal", accent: false },
        { key: "won", label: "Won", accent: false },
        { key: "lost", label: "Lost", accent: false },
      ].map(({ key, label, accent }) => (
        <Card key={key} className={`${accent ? "border-gold/30 bg-gold/5" : ""}`}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${accent ? "text-gold-dark" : ""}`}>
              {stats[key] ?? 0}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProjectDetailsCard({ projectType, budget, timeline }: { projectType: string | null; budget: string | null; timeline: string | null }) {
  if (!projectType && !budget && !timeline) return null;
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projectType && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Project Type</p>
              <p className="text-sm font-medium mt-1">{projectType}</p>
            </div>
          )}
          {budget && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Budget</p>
              <p className="text-sm font-medium mt-1">{budget}</p>
            </div>
          )}
          {timeline && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Timeline</p>
              <p className="text-sm font-medium mt-1">{timeline}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LeadDetail({
  leadId,
  onClose,
}: {
  leadId: number;
  onClose: () => void;
}) {
  const [noteText, setNoteText] = useState("");
  const utils = trpc.useUtils();

  const { data: lead, isLoading } = trpc.crm.getById.useQuery({ id: leadId });

  const updateStatus = trpc.crm.updateStatus.useMutation({
    onSuccess: () => {
      utils.crm.getById.invalidate({ id: leadId });
      utils.crm.list.invalidate();
      utils.crm.stats.invalidate();
      toast.success("Status updated");
    },
  });

  const addNote = trpc.crm.addNote.useMutation({
    onSuccess: () => {
      utils.crm.getById.invalidate({ id: leadId });
      setNoteText("");
      toast.success("Note added");
    },
  });

  const deleteLead = trpc.crm.delete.useMutation({
    onSuccess: () => {
      utils.crm.list.invalidate();
      utils.crm.stats.invalidate();
      onClose();
      toast.success("Lead deleted");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12 text-muted-foreground">Lead not found</div>
    );
  }

  type SafeLead = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    source: string;
    status: string;
    projectType: string | null;
    budget: string | null;
    timeline: string | null;
    address: string | null;
    message: string | null;
    createdAt: Date;
    updatedAt: Date;
    notes: Array<{ id: number; leadId: number; content: string; authorName: string | null; createdAt: Date }>;
  };
  const l = lead as unknown as SafeLead;
  type LeadMetadata = {
    messages?: Array<{ role: string; text: string }>;
    rawAnswers?: unknown;
    contactInfo?: unknown;
    [k: string]: unknown;
  };
  const metadata = (lead as any).metadata as LeadMetadata | null;
  const chatMessages = l.source === "chat" && Array.isArray(metadata?.messages) ? metadata!.messages : null;
  const hasMetadataDetails = metadata != null && Object.keys(metadata).filter(k => k !== "rawAnswers" && k !== "messages" && k !== "contactInfo").length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>{l.name}</h2>
          <div className="flex items-center gap-3 mt-1">
            <SourceBadge source={l.source as LeadSource} />
            <span className="text-xs text-muted-foreground">
              {new Date(l.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <StatusBadge status={l.status as LeadStatus} />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => updateStatus.mutate({ id: l.id, status: key as LeadStatus })}
                  className={l.status === key ? "bg-accent" : ""}
                >
                  <span className={`${config.color}`}>{config.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this lead?")) {
                deleteLead.mutate({ id: l.id });
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contact Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {l.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${l.email}`} className="text-gold-dark hover:underline">{l.email}</a>
            </div>
          )}
          {l.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${l.phone}`} className="text-gold-dark hover:underline">{l.phone}</a>
            </div>
          )}
          {l.address && (
            <div className="flex items-start gap-2 text-sm">
              <Search className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{l.address}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Details */}
      <ProjectDetailsCard projectType={l.projectType} budget={l.budget} timeline={l.timeline} />

      {/* Message */}
      {!!l.message && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Message</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{l.message}</p>
          </CardContent>
        </Card>
      )}

      {/* Extra Metadata */}
      {hasMetadataDetails && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Additional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(metadata!).map(([key, value]) => {
                if (key === "rawAnswers" || key === "messages" || key === "contactInfo") return null;
                return (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground capitalize min-w-[100px]">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span>{typeof value === "string" ? value : String(JSON.stringify(value))}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Messages (for chat leads) */}
      {chatMessages != null && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>Chat Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded ${
                    msg.role === "user" ? "bg-gold/10 ml-4" : "bg-muted mr-4"
                  }`}
                >
                  <span className="font-medium text-xs text-muted-foreground">
                    {msg.role === "user" ? "Customer" : "Bot"}:
                  </span>
                  <p className="mt-0.5">{msg.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Notes ({l.notes?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add note form */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Add a note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="min-h-[60px] resize-none text-sm"
            />
            <Button
              size="sm"
              className="btn-gold shrink-0 self-end"
              disabled={!noteText.trim() || addNote.isPending}
              onClick={() => addNote.mutate({ leadId: l.id, content: noteText.trim() })}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Notes list */}
          {l.notes && l.notes.length > 0 ? (
            <div className="space-y-3">
              {l.notes.map((note) => (
                <div key={note.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{note.authorName || "Admin"}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No notes yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function CrmDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const pageSize = 25;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const queryInput = useMemo(
    () => ({
      source: sourceFilter !== "all" ? (sourceFilter as LeadSource) : undefined,
      status: statusFilter !== "all" ? (statusFilter as LeadStatus) : undefined,
      search: debouncedSearch || undefined,
      limit: pageSize,
      offset: page * pageSize,
    }),
    [sourceFilter, statusFilter, debouncedSearch, page]
  );

  const { data: leadsData, isLoading: leadsLoading } = trpc.crm.list.useQuery(queryInput);
  const { data: stats } = trpc.crm.stats.useQuery();

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSourceFilter("all");
    setStatusFilter("all");
    setPage(0);
  }, []);

  // Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Sign In Required</h2>
            <p className="text-muted-foreground mb-6 text-sm">Access to the CRM dashboard requires authentication.</p>
            <Button className="btn-gold" onClick={() => (window.location.href = getLoginUrl())}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Access Denied</h2>
            <p className="text-muted-foreground mb-6 text-sm">Only administrators can access the CRM dashboard.</p>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalPages = Math.ceil((leadsData?.total ?? 0) / pageSize);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Site
              </Button>
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Lead Management
                </h1>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Manage all form submissions and inquiries
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        {stats && <StatsCards stats={stats} />}

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads by name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0);
                  }}
                  className="pl-9"
                />
              </div>
              <Select
                value={sourceFilter}
                onValueChange={(v) => {
                  setSourceFilter(v);
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="contact">Contact Form</SelectItem>
                  <SelectItem value="intake">Get Started</SelectItem>
                  <SelectItem value="chat">Live Chat</SelectItem>
                  <SelectItem value="lot_feasibility">Lot Feasibility</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || sourceFilter !== "all" || statusFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="shrink-0">
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lead List */}
        <Card>
          <CardContent className="p-0">
            {leadsLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
              </div>
            ) : !leadsData?.leads?.length ? (
              <div className="text-center py-16">
                <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>No leads found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || sourceFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Leads will appear here when visitors submit forms on your site"}
                </p>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_140px_120px_120px_100px] gap-4 px-4 py-3 border-b bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span>Lead</span>
                  <span>Source</span>
                  <span>Status</span>
                  <span>Date</span>
                  <span className="text-right">Action</span>
                </div>

                {/* Lead rows */}
                {leadsData.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_140px_120px_120px_100px] gap-2 sm:gap-4 px-4 py-3 border-b last:border-b-0 hover:bg-muted/20 transition-colors cursor-pointer items-center"
                    onClick={() => setSelectedLeadId(lead.id)}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{lead.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.email || lead.phone || lead.message?.slice(0, 50) || "—"}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <SourceBadge source={lead.source as LeadSource} />
                    </div>
                    <div>
                      <StatusBadge status={lead.status as LeadStatus} />
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="hidden sm:flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeadId(lead.id);
                        }}
                      >
                        View
                      </Button>
                    </div>
                    {/* Mobile source + date */}
                    <div className="flex sm:hidden items-center gap-3 text-xs text-muted-foreground">
                      <SourceBadge source={lead.source as LeadSource} />
                      <span>
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, leadsData.total)} of{" "}
                      {leadsData.total}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={selectedLeadId !== null} onOpenChange={(open) => !open && setSelectedLeadId(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLeadId && (
            <LeadDetail leadId={selectedLeadId} onClose={() => setSelectedLeadId(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
