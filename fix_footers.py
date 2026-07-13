import os
import re

# The correct footer content, WITHOUT the leading "../" path prefixes.
# The {p} placeholder gets replaced with the right number of "../" for each file's depth.
FOOTER_TEMPLATE = '''<footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-brand" data-i18n-html="footer.novastudios">
                    <span class="logo-text" data-i18n-html="footer.novastudios_1">NOVA<span class="logo-accent" data-i18n="footer.studios">STUDIOS</span></span>
                </div>
                <p data-i18n="footer.nova_studios_is_a_global_entertainm">Nova Studios is a global entertainment company dedicated to bringing extraordinary stories to life.</p>
                <div class="footer-social">
                    <a href="https://facebook.com/NovaStudios" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                    <a href="https://twitter.com/NovaStudios" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                    <a href="https://instagram.com/NovaStudios" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    <a href="https://youtube.com/@NovaStudios" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                    <a href="https://linkedin.com/company/novastudios" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h3 data-i18n="footer.company">Company</h3>
                <ul>
                    <li data-i18n-html="footer.about_us"><a href="{p}about.html" data-i18n="footer.about_us_1">About Us</a></li>
                    <li data-i18n-html="footer.careers"><a href="{p}company/careers.html" data-i18n="footer.careers_1">Careers</a></li>
                    <li data-i18n-html="footer.news"><a href="{p}news.html" data-i18n="footer.news_1">News</a></li>
                    <li data-i18n-html="footer.investors"><a href="{p}company/investors.html" data-i18n="footer.investors_1">Investors</a></li>
                    <li data-i18n-html="footer.sustainability"><a href="{p}company/sustainability.html" data-i18n="footer.sustainability_1">Sustainability</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3 data-i18n="footer.entertainment">Entertainment</h3>
                <ul>
                    <li data-i18n-html="footer.movies"><a href="{p}movies.html" data-i18n="footer.movies_1">Movies</a></li>
                    <li data-i18n-html="footer.tv_shows"><a href="{p}entertainment/tv-shows.html" data-i18n="footer.tv_shows_1">TV Shows</a></li>
                    <li data-i18n-html="footer.nova"><a href="{p}entertainment/streaming.html" data-i18n="footer.nova_1">Nova+</a></li>
                    <li data-i18n-html="footer.theme_parks"><a href="{p}entertainment/theme-parks.html" data-i18n="footer.theme_parks_1">Theme Parks</a></li>
                    <li data-i18n-html="footer.shop"><a href="{p}entertainment/merchandise.html" data-i18n="footer.shop_1">Shop</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3 data-i18n="footer.support">Support</h3>
                <ul>
                    <li data-i18n-html="footer.help_center"><a href="{p}support/help.html" data-i18n="footer.help_center_1">Help Center</a></li>
                    <li data-i18n-html="footer.contact_us"><a href="{p}contact.html" data-i18n="footer.contact_us_1">Contact Us</a></li>
                    <li data-i18n-html="footer.faq"><a href="{p}support/faq.html" data-i18n="footer.faq_1">FAQ</a></li>
                    <li data-i18n-html="footer.privacy_policy"><a href="{p}legal/privacy.html" data-i18n="footer.privacy_policy_1">Privacy Policy</a></li>
                    <li data-i18n-html="footer.terms_of_service"><a href="{p}legal/terms.html" data-i18n="footer.terms_of_service_1">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p data-i18n="footer.2026_nova_studios_all_rights_reserv">© 2026 Nova Studios. All rights reserved.</p>
            <div class="footer-bottom-links" data-i18n-html="footer.privacy_terms_accessibility">
                <a href="{p}legal/privacy.html" data-i18n="footer.privacy">Privacy</a>
                <a href="{p}legal/terms.html" data-i18n="footer.terms">Terms</a>
                <a href="{p}legal/accessibility-page.html" data-i18n="footer.accessibility">Accessibility</a>
            </div>
        </div>
    </footer>'''

# Files to skip entirely (already correct, or intentionally different)
SKIP_FILES = {"about.html", "index.html"}

# Folders to never touch
SKIP_DIRS = {"node_modules", ".git"}

# Regex to find a <footer class="site-footer"> ... </footer> block, across multiple lines
FOOTER_PATTERN = re.compile(
    r'<footer class="site-footer">.*?</footer>',
    re.DOTALL
)

def find_html_files(root):
    html_files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for f in filenames:
            if f.endswith(".html"):
                full_path = os.path.join(dirpath, f)
                html_files.append(full_path)
    return html_files

def main(root_dir):
    html_files = find_html_files(root_dir)
    changed = []
    skipped_no_footer = []
    skipped_intentional = []

    for filepath in html_files:
        rel_path = os.path.relpath(filepath, root_dir)
        filename = os.path.basename(filepath)

        if filename in SKIP_FILES and os.path.dirname(rel_path) == "":
            skipped_intentional.append(rel_path)
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        if not FOOTER_PATTERN.search(content):
            skipped_no_footer.append(rel_path)
            continue

        # Calculate folder depth relative to root, to build correct "../" prefix
        depth = rel_path.count(os.sep)
        prefix = "../" * depth

        new_footer = FOOTER_TEMPLATE.format(p=prefix)
        new_content = FOOTER_PATTERN.sub(new_footer, content)

        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            changed.append(rel_path)

    print(f"\n✅ Fixed footers in {len(changed)} files:")
    for c in changed:
        print(f"   - {c}")

    print(f"\n⏭️  Skipped (already correct, about.html/index.html): {len(skipped_intentional)}")
    for s in skipped_intentional:
        print(f"   - {s}")

    if skipped_no_footer:
        print(f"\n⚠️  No footer found in {len(skipped_no_footer)} files (check these manually):")
        for s in skipped_no_footer:
            print(f"   - {s}")

if __name__ == "__main__":
    import sys
    root = sys.argv[1] if len(sys.argv) > 1 else "."
    main(root)
