'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import './page.css';

export default function NotesPage() {
  const [bstages, setBstages] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // ═══════════════════════════════════════
  // TASK & PHASE DEFINITIONS
  // ═══════════════════════════════════════
  const TASKS = [
    // Phase 1
    {
      phase: 1,
      name: 'Yêu cầu mở b.stage mới',
      desc: 'Gửi yêu cầu tạo b.stage mới cho nghệ sĩ, bao gồm việc cấu hình tên miền riêng (custom domain) nếu có.',
      time: '2–3 ngày · tối thiểu 2 tuần trước ra mắt',
      icon: 'clock',
      links: [{ text: 'Submit form request', url: 'https://forms.gle/rqjdBtzP7qaBRARc9' }],
    },
    {
      phase: 1,
      name: 'Demo nền tảng b.stage',
      desc: 'Chuẩn bị một bản demo b.stage cơ bản để giới thiệu cho đối tác nghệ sĩ.',
      time: '1 tuần trước buổi gặp khách hàng',
      icon: 'clock',
      links: [
        { text: 'Jessica Demo', url: 'https://jessica.bstage.in/' },
        { text: 'ONEISLAND Demo', url: 'https://one-island.bstage.in/' },
      ],
    },
    {
      phase: 1,
      name: 'Lên ý tưởng bố cục demo',
      desc: 'Lên ý tưởng về bố cục trang chủ, các trang nội dung và định hướng nghệ thuật.',
      time: '1 tuần làm việc trước khi ra mắt',
      icon: 'clock',
      links: [
        {
          text: 'Material Request',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
    {
      phase: 1,
      name: 'Xác định lịch trình ra mắt tính năng',
      desc: 'Thảo luận và thống nhất với đối tác nghệ sĩ về lộ trình ra mắt các tính năng chính.',
      time: 'Trong buổi gặp khách hàng',
      icon: 'clock',
      links: [],
    },
    // Phase 2
    {
      phase: 2,
      name: 'Setup account admin (internal) và nghệ sĩ (partner)',
      desc: 'Tạo và cấu hình tài khoản quản trị (admin) cho đội ngũ nội bộ và tài khoản đối tác.',
      time: '1–2 ngày làm việc sau khi b.stage mở domain',
      icon: 'clock',
      links: [
        {
          text: 'Tạo account',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
    {
      phase: 2,
      name: 'Setup trang Home / Content / Shop',
      desc: 'Cấu hình trang chủ (Main Home), trang nội dung (Content Home) và trang cửa hàng (Shop).',
      time: '1–2 ngày · tối thiểu 3–5 ngày trước ra mắt',
      icon: 'clock',
      links: [
        {
          text: 'Manage Menu',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
    {
      phase: 2,
      name: 'Schedule (lịch trình)',
      desc: 'Cập nhật lịch hoạt động của nghệ sĩ trên b.stage.',
      time: '1–2 ngày làm việc trước ngày ra mắt',
      icon: 'clock',
      links: [
        {
          text: 'Schedule',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
    {
      phase: 2,
      name: 'Content welcome',
      desc: 'Chuẩn bị và đăng tải các nội dung chào mừng.',
      time: '',
      icon: 'clock',
      links: [
        {
          text: 'Free content',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
      launch: true,
    },
    // Phase 3
    {
      phase: 3,
      name: 'Kế hoạch nội dung',
      desc: 'Xây dựng kế hoạch nội dung dài hạn (hàng tuần/tháng).',
      time: 'Hàng tháng / Quý',
      icon: 'doc',
      links: [
        {
          text: 'Free content',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
    {
      phase: 3,
      name: 'Monetize — Shop & Membership',
      desc: 'Tối ưu hóa hiệu quả của cửa hàng (Merchandise) và các gói thành viên (Membership).',
      time: 'Membership: 1–2 ngày · Merchandise: 2–3 ngày',
      icon: 'clock',
      links: [
        {
          text: 'Shop & Product',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
    {
      phase: 3,
      name: 'Revise — Đánh giá và điều chỉnh',
      desc: 'Định kỳ đánh giá hiệu suất của b.stage và điều chỉnh chiến lược.',
      time: 'Hàng tháng / Quý',
      icon: 'doc',
      links: [
        {
          text: 'Datalabs',
          url: 'https://docs.google.com/document/d/150GqmnfPGMmBAG4BbOREKdWLeatlZdIN76i9O-2d6dg/edit',
        },
      ],
    },
  ];

  const TOTAL = TASKS.length; // 11

  const PHASES = [
    { id: 1, name: 'Pre Onboard', cls: 'p1', color: 'var(--p1)', light: 'var(--p1-light)' },
    { id: 2, name: 'Onboard', cls: 'p2', color: 'var(--p2)', light: 'var(--p2-light)' },
    { id: 3, name: 'Post Onboard', cls: 'p3', color: 'var(--p3)', light: 'var(--p3-light)' },
  ];

  const AVATAR_COLORS = ['#6c63d4', '#0f9068', '#b06e12', '#c93535', '#0e7eb8', '#7a3fb5', '#1a6b47'];

  // ═══════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════
  const phaseTaskIndices = (phaseId) => {
    return TASKS.map((t, i) => (t.phase === phaseId ? i : -1)).filter((i) => i >= 0);
  };

  const countDone = (checks) => checks.filter(Boolean).length;

  const phasePct = (phaseId, checks) => {
    const idxs = phaseTaskIndices(phaseId);
    const done = idxs.filter((i) => checks[i]).length;
    return { done, total: idxs.length, pct: Math.round((done / idxs.length) * 100) };
  };

  const avatarColor = (name, idx) => {
    const i = (name.charCodeAt(0) + idx) % AVATAR_COLORS.length;
    return AVATAR_COLORS[i];
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // ═══════════════════════════════════════
  // LOAD DATA FROM SUPABASE
  // ═══════════════════════════════════════
  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase.from('notes').select();
      if (error) {
        console.error('Error loading data:', error);
      } else {
        // Ensure checks array is properly initialized
        const normalizedData = (data || []).map((b) => ({
          ...b,
          checks: Array.isArray(b.checks) && b.checks.length === TOTAL ? b.checks : Array(TOTAL).fill(false),
        }));
        setBstages(normalizedData);
      }
      setLoading(false);
    };

    loadData();

    // ═══════════════════════════════════════
    // SUBSCRIBE TO REALTIME UPDATES
    // ═══════════════════════════════════════
    const channel = supabase
      .channel('realtime_notes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notes' },
        (payload) => {
          console.log('New record inserted:', payload.new);
          const newRecord = {
            ...payload.new,
            checks: Array.isArray(payload.new.checks) ? payload.new.checks : Array(TOTAL).fill(false),
          };
          setBstages((current) => [...current, newRecord]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notes' },
        (payload) => {
          console.log('Record updated:', payload.new);
          setBstages((current) =>
            current.map((b) => (b.id === payload.new.id ? { ...b, ...payload.new } : b))
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notes' },
        (payload) => {
          console.log('Record deleted:', payload.old);
          setBstages((current) => current.filter((b) => b.id !== payload.old.id));
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ═══════════════════════════════════════
  // CRUD OPERATIONS
  // ═══════════════════════════════════════
  const toggleTask = async (idx, checked) => {
    const b = bstages.find((x) => x.id === currentId);
    if (!b) return;

    const newChecks = [...b.checks];
    newChecks[idx] = checked;

    const { error } = await supabase.from('notes').update({ checks: newChecks }).eq('id', b.id);
    if (error) console.error('Error updating task:', error);
  };

  const resetCurrent = async () => {
    const b = bstages.find((x) => x.id === currentId);
    if (!b || !confirm(`Reset toàn bộ tiến độ cho "${b.name}"?`)) return;

    const { error } = await supabase.from('notes').update({ checks: Array(TOTAL).fill(false) }).eq('id', b.id);
    if (error) console.error('Error resetting:', error);
  };

  const deleteBstage = async (id) => {
    const b = bstages.find((x) => x.id === id);
    if (!b || !confirm(`Xoá b.stage "${b.name}"?\nDữ liệu sẽ không thể khôi phục.`)) return;

    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) console.error('Error deleting:', error);
  };

  const confirmAdd = async () => {
    const name = modalInput.trim();
    if (!name) return;

    const { data, error } = await supabase
      .from('notes')
      .insert([{ name, checks: Array(TOTAL).fill(false), created_at: new Date().toISOString() }])
      .select();

    if (error) {
      console.error('Error creating b.stage:', error);
    } else {
      setModalInput('');
      setModalOpen(false);
    }
  };

  // ═══════════════════════════════════════
  // RENDER FUNCTIONS
  // ═══════════════════════════════════════
  const computeGradient = (checks) => {
    const PHASE_COLORS = ['#6c63d4', '#0f9068', '#b06e12'];
    const EMPTY_COLOR = '#dedad2';
    const BLEND = 3.2;

    const ws = PHASES.map((ph) => {
      const idxs = phaseTaskIndices(ph.id);
      return ((idxs.filter((j) => checks[j]).length / TOTAL) * 100);
    });
    const total = ws.reduce((a, b) => a + b, 0);
    if (total < 0.01) return EMPTY_COLOR;

    const active = [];
    let cum = 0;
    ws.forEach((w, i) => {
      if (w > 0.01) active.push({ c: PHASE_COLORS[i], s: cum, e: cum + w });
      cum += w;
    });

    const stops = [];
    active.forEach((seg, i) => {
      const next = active[i + 1];
      if (i === 0) stops.push(`${seg.c} 0%`);
      if (next) {
        const blo = Math.max(seg.s, seg.e - BLEND);
        const bhi = Math.min(total, seg.e + BLEND);
        if (blo > 0) stops.push(`${seg.c} ${blo.toFixed(2)}%`);
        stops.push(`${next.c} ${bhi.toFixed(2)}%`);
      } else {
        stops.push(`${seg.c} ${seg.e.toFixed(2)}%`);
      }
    });

    if (total < 99.5) {
      stops.push(`${EMPTY_COLOR} ${total.toFixed(2)}%`);
      stops.push(`${EMPTY_COLOR} 100%`);
    }

    return `linear-gradient(90deg, ${stops.join(', ')})`;
  };

  const renderSummaryBoard = () => {
    const total = bstages.length;
    const totalTasks = total * TOTAL;
    const totalDone = bstages.reduce((a, b) => a + countDone(b.checks), 0);
    const avgPct = total > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

    return (
      <div className="summary-board">
        <div className="sum-card anim-fadein">
          <div className="sum-n">{total}</div>
          <div className="sum-l">b.stage đang quản lý</div>
        </div>
        <div className="sum-card anim-fadein" style={{ animationDelay: '.05s' }}>
          <div className="sum-n">
            {totalDone}<span>/{totalTasks}</span>
          </div>
          <div className="sum-l">Tasks hoàn thành</div>
        </div>
        <div className="sum-card anim-fadein" style={{ animationDelay: '.1s' }}>
          <div className="sum-n">{avgPct}%</div>
          <div className="sum-l">Tiến độ trung bình</div>
        </div>
      </div>
    );
  };

  const renderCard = (b, idx) => {
    const done = countDone(b.checks);
    const pct = Math.round((done / TOTAL) * 100);
    const color = avatarColor(b.name, idx);

    let statusCls = 'badge-neutral',
      statusTxt = 'Chưa bắt đầu';
    if (pct === 100) {
      statusCls = 'badge-done';
      statusTxt = 'Hoàn thành';
    } else if (pct > 0) {
      statusCls = 'badge-progress';
      statusTxt = 'Đang thực hiện';
    }

    const initials = b.name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const dateStr = b.created_at ? formatDate(new Date(b.created_at)) : '';

    return (
      <div
        key={b.id}
        className="bstage-card anim-fadeup"
        style={{ animationDelay: `${idx * 0.04}s` }}
        onClick={() => setCurrentId(b.id)}
      >
        <button
          className="card-delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteBstage(b.id);
          }}
          title="Xoá b.stage"
        >
          ×
        </button>
        <div className="card-top">
          <div className="card-avatar" style={{ background: color }}>
            {initials || '?'}
          </div>
          <div className="card-info">
            <div className="card-name">{b.name}</div>
            {dateStr && <div className="card-date">Tạo ngày {dateStr}</div>}
          </div>
          <span className={`badge ${statusCls}`}>{statusTxt}</span>
        </div>
        <div className="card-bar-row">
          <div className="sbar">
            <div
              className="sbar-fill"
              style={{ background: computeGradient(b.checks) }}
            ></div>
          </div>
          <span className="card-pct">{pct}%</span>
        </div>
        <div className="card-phases">
          {PHASES.map((ph) => {
            const { done: pd, total: pt } = phasePct(ph.id, b.checks);
            const p = Math.round((pd / pt) * 100);
            return (
              <div key={ph.id} className="card-phase-dot">
                <div
                  className="dot"
                  style={{ background: ph.color }}
                ></div>
                {ph.name.split(' ')[0]} {p}%
              </div>
            );
          })}
        </div>
        <div className="card-count">
          {done} / {TOTAL} tasks hoàn thành
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    const b = bstages.find((x) => x.id === currentId);
    if (!b) return null;

    const done = countDone(b.checks);
    const pct = Math.round((done / TOTAL) * 100);

    return (
      <div id="screen-detail" className="screen active">
        <div className="wrap">
          <div className="detail-topbar">
            <button className="btn-back" onClick={() => setCurrentId(null)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M8 2L4 6l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Quay lại
            </button>
            <div className="detail-crumb">
              <span>{b.name}</span>
            </div>
          </div>

          <div className="header">
            <div className="header-eyebrow">Team MFan</div>
            <div className="header-top">
              <div>
                <h1 id="detail-title">{b.name} Checklist</h1>
                <p className="header-sub">
                  Quy trình vận hành — Chuẩn bị, triển khai &amp; duy trì sau khi ra mắt.
                </p>
              </div>
              <button className="btn-reset" onClick={resetCurrent}>
                ↺ Reset
              </button>
            </div>
          </div>

          <div className="note">
            <strong>Hướng dẫn:</strong> Tích vào ô checkbox để đánh dấu công việc đã hoàn thành. Tiến độ được cập nhật tự động trên Supabase.
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-n">{TOTAL}</div>
              <div className="stat-l">Tổng công việc</div>
            </div>
            <div className="stat">
              <div className="stat-n">{done}</div>
              <div className="stat-l">Đã hoàn thành</div>
            </div>
            <div className="stat">
              <div className="stat-n">{pct}%</div>
              <div className="stat-l">Tiến độ chung</div>
            </div>
          </div>

          <div className="overall">
            <div className="overall-top">
              <span className="overall-label">Tổng tiến độ 3 giai đoạn</span>
              <span className="overall-pct">{pct}%</span>
            </div>
            <div className="sbar" id="sbar-main" style={{ marginBottom: 0 }}>
              <div
                className="sbar-fill"
                style={{ background: computeGradient(b.checks) }}
              ></div>
            </div>
            <div className="phase-dots">
              {PHASES.map((ph, idx) => {
                const { done: pd, total: pt } = phasePct(ph.id, b.checks);
                const p = Math.round((pd / pt) * 100);
                return (
                  <div key={ph.id} className="pdot">
                    <div className="pdot-circle" style={{ background: ph.color }}></div>
                    <span>
                      {ph.name} — {p}%
                    </span>
                    {idx < PHASES.length - 1 && <span className="pdot-sep">·</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div id="phases-container">
            {PHASES.map((ph) => renderPhaseBlock(ph, b))}
          </div>

          <div className="footer">B.Stage Checklist Manager · Team MFan · Dữ liệu lưu trên Supabase</div>
        </div>
      </div>
    );
  };

  const renderPhaseBlock = (ph, b) => {
    const phTasks = TASKS.map((t, i) => ({ ...t, idx: i })).filter((t) => t.phase === ph.id);
    const { pct } = phasePct(ph.id, b.checks);

    const CLOCK_ICON = (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M6 3.5V6L7.5 7.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
    const DOC_ICON = (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 5.5h4M4 7.5h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );

    return (
      <div key={ph.id} className={`phase ${ph.cls}`}>
        <div className="phase-head">
          <div className="phase-left">
            <span className="phase-pill">Phase {ph.id}</span>
            <span className="phase-title">{ph.name}</span>
          </div>
          <div className="phase-right">
            <div className="phase-bar-track">
              <div className="phase-bar-fill" style={{ width: `${pct}%` }}></div>
            </div>
            <span className="phase-pct">{pct}%</span>
          </div>
        </div>
        <div className="task-list">
          {phTasks.map((t) => {
            const checked = b.checks[t.idx];
            const icon = t.icon === 'doc' ? DOC_ICON : CLOCK_ICON;
            const timeHtml = t.launch ? (
              <div className="time-row">
                <span className="launch-tag">🚀 Ngày ra mắt b.stage</span>
              </div>
            ) : (
              <div className="time-row">
                <span className="time-tag">
                  {icon} {t.time}
                </span>
              </div>
            );
            const linksHtml =
              t.links.length > 0 ? (
                <div className="links-row">
                  {t.links.map((l, idx) => (
                    <a key={idx} href={l.url} target="_blank" rel="noopener noreferrer" className="ref">
                      {l.text}
                    </a>
                  ))}
                </div>
              ) : null;

            return (
              <div key={t.idx} className={`task-item${checked ? ' completed' : ''}`} data-idx={t.idx}>
                <input
                  type="checkbox"
                  className="cb"
                  data-idx={t.idx}
                  checked={checked}
                  onChange={(e) => toggleTask(t.idx, e.target.checked)}
                />
                <div className="task-body">
                  <div className="task-name">{t.name}</div>
                  <div className="task-desc">{t.desc}</div>
                  <div className="task-meta">
                    {timeHtml}
                    {linksHtml}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center' }}>Đang tải...</div>;
  }

  if (currentId !== null) {
    return renderDetail();
  }

  // Dashboard view
  return (
    <div id="screen-dashboard" className="screen active">
      <div className="wrap">
        <header className="dash-header">
          <div className="dash-header-text">
            <div className="eyebrow">Team MFan</div>
            <h1>B.Stage Checklist Manager</h1>
            <p className="sub">Quản lý tiến độ checklist vận hành cho từng nghệ sĩ.</p>
          </div>
          <div className="dash-header-actions">
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Thêm b.stage
            </button>
          </div>
        </header>

        {renderSummaryBoard()}

        {bstages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p className="empty-title">Chưa có b.stage nào</p>
            <p className="empty-sub">Nhấn "Thêm b.stage" để bắt đầu quản lý tiến độ.</p>
          </div>
        ) : (
          <>
            <div className="section-label">{bstages.length} b.stage đang được quản lý</div>
            <div className="bstage-grid">{bstages.map((b, idx) => renderCard(b, idx))}</div>
          </>
        )}
      </div>

      {/* Modal */}
      <div
        className={`modal-overlay${modalOpen ? ' active' : ''}`}
        onClick={(e) => {
          if (e.target.id === 'modal-overlay-elem') setModalOpen(false);
        }}
        id="modal-overlay-elem"
      >
        <div className="modal">
          <div className="modal-title">Thêm b.stage mới</div>
          <div className="modal-sub">Nhập tên nghệ sĩ để tạo một checklist riêng.</div>
          <input
            type="text"
            className="modal-input"
            placeholder="Tên nghệ sĩ / b.stage..."
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') confirmAdd();
            }}
            autoFocus={modalOpen}
          />
          <div className="modal-actions">
            <button className="btn-ghost" onClick={() => setModalOpen(false)}>
              Huỷ
            </button>
            <button className="btn-primary" onClick={confirmAdd}>
              Tạo checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}